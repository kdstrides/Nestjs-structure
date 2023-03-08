import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with database config based operations.
 *
 * @class
 */
@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get database(): string {
    return this.configService.get<string>('database.name');
  }

  get host(): string {
    return this.configService.get<string>('database.host');
  }

  get username(): string {
    return this.configService.get<string>('database.username');
  }

  get password(): string {
    return this.configService.get<string>('database.password');
  }

  get port(): number {
    return Number(this.configService.get<number>('database.port'));
  }

  get synchronize(): number {
    return Number(this.configService.get<number>('database.synchronize'));
  }

  get logging(): number {
    return Number(this.configService.get<number>('database.logging'));
  }

  get entities(): number {
    return Number(this.configService.get<number>('database.entities'));
  }
}
