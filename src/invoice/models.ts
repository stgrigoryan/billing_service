import { StatusType } from './invoice.entity';

type CommonData = {
  currency: string;
  amount: number;
};

export interface PdfData extends CommonData {
  name: string;
  email: string;
  date: string;
  account: string;
}

export interface InvoiceEntityData extends CommonData {
  issueDate: Date;
  status: StatusType;
  userId: number;
  accountId: number;
}
