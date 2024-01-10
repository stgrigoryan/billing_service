import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice, StatusType } from './invoice.entity';
import { InvoiceEntityData } from './models';

export class InvoiceRepository {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  create(invoiceData: InvoiceEntityData) {
    const newInvoice = this.invoiceRepository.create({
      ...invoiceData,
      user: { id: invoiceData.userId },
      account: { id: invoiceData.accountId },
    });
    return this.invoiceRepository.save(newInvoice);
  }

  findIssuedInvoices() {
    return this.invoiceRepository.find({
      where: { status: StatusType.Issued },
    });
  }

  updateInvoicesStatus(ids: number[]) {
    return this.invoiceRepository.update(
      {
        id: In(ids),
      },
      { status: StatusType.Paid },
    );
  }
}
