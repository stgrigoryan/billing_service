import { Body, Controller, Post, Response } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/createInvoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}
  @Post()
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Response() response,
  ) {
    const pdfBuffer = await this.invoiceService.create(createInvoiceDto);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=invoice.pdf',
    );
    response.send(pdfBuffer);
  }
}
