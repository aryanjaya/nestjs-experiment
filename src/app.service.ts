import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from './configs';

@Injectable()
export class AppService {
  constructor(private config: ConfigService<ConfigType, true>) {}

  getHello(): string {
    return 'Hello World!';
  }

  debug(): boolean {
    return this.config.get('app.debug', { infer: true }) === 'true';
  }
}
