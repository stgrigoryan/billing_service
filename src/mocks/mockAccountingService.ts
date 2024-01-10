import { MockHttpService } from './mockHttPService';

const mockAccountingServiceUrl = 'www.accounting.com/invoices';

export class MockAccountingService {
  private readonly httpService: MockHttpService;

  constructor() {
    this.httpService = new MockHttpService();
  }
  async checkPaidInvoices(options: Record<string, any>) {
    await this.httpService.post(mockAccountingServiceUrl, options);
    // in real life scenario we get invoices with "Paid" status
    //here mocking return value
    return {
      ids: options.data as number[],
    };
  }
}
