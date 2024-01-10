import { MockHttpService } from './mockHttPService';

const mockBankingPaymentUrl = 'www.abank.com/payments';

export class MockBankingService {
  private readonly httpService: MockHttpService;

  constructor() {
    this.httpService = new MockHttpService();
  }
  async processPaymennt(options?: Record<string, any>) {
    return this.httpService.post(mockBankingPaymentUrl, options);
  }
}
