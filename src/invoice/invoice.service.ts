import { BadRequestException, Injectable } from '@nestjs/common';
import * as pdfkit from 'pdfkit';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AccountService } from '../account/account.service';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { InvoiceRepository } from './invoice.repository';
import { StatusType } from './invoice.entity';
import { InvoiceEntityData, PdfData } from './models';
import { MockAccountingService } from 'src/mocks/mockAccountingService';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly accountService: AccountService,
    private readonly invoiceRepository: InvoiceRepository,
    private readonly mockAccountingService: MockAccountingService,
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    const companyAccount = await this.accountService.findByUserAndCurrency(
      createInvoiceDto.userId,
      createInvoiceDto.currency,
    );
    if (companyAccount.amount - createInvoiceDto.amount < 0) {
      throw new BadRequestException();
    }
    const currentDate = new Date(Date.now());
    const pdfData: PdfData = {
      name: companyAccount.user.name,
      email: companyAccount.user.email,
      currency: companyAccount.currency,
      account: companyAccount.accountNumber,
      amount: createInvoiceDto.amount,
      date: InvoiceService.generateDate(currentDate),
    };
    const invoiceData: InvoiceEntityData = {
      currency: companyAccount.currency,
      issueDate: currentDate,
      amount: createInvoiceDto.amount,
      status: StatusType.Issued,
      userId: companyAccount.user.id,
      accountId: companyAccount.id,
    };
    await this.invoiceRepository.create(invoiceData);
    return this.generatePdf(pdfData);
  }

  private static generateDate(currentDate: Date) {
    const year = currentDate.getFullYear() % 100;

    return (
      (currentDate.getMonth() + 1).toString() +
      '/' +
      currentDate.getDate().toString() +
      '/' +
      year.toString()
    );
  }

  //checking for some frequency(in real case this should be configurable) invoices which status is not 'paid'
  // then getting their info from Accounting API
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkPaidInvoices() {
    const issuedInvoices = await this.invoiceRepository.findIssuedInvoices();
    const issuedInvoicesIds = issuedInvoices.map((invoice) => invoice.id);
    const response = await this.mockAccountingService.checkPaidInvoices({
      data: issuedInvoicesIds,
    });
    if (response?.ids?.length) {
      return this.invoiceRepository.updateInvoicesStatus(response.ids);
    }
  }

  private generatePdf(data: PdfData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new pdfkit();
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });

      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on('error', (error) => {
        reject(error);
      });

      doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .text('Invoice', { align: 'center' });

      doc.moveDown(0.5);

      Object.entries(data).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`, { lineGap: 10 });
      });

      doc.end();
    });
  }
}
