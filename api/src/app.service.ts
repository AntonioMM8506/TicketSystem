import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Testing';
  }

  /*
  getVersion(): string {
    return 'Version Testing'
  }
  */
}
