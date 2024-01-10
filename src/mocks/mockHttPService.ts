import { Injectable } from '@nestjs/common';

export interface IHttpService {
  post(url: string, options: Record<string, any> | string): Promise<any>;
}

@Injectable()
export class MockHttpService implements IHttpService {
  async post(url: string, options: Record<string, any> | string): Promise<any> {
    return 'OK';
  }
}
