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
    return this.configService.get<string>('database.database');
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

  get synchronize(): boolean {
    return this.configService.get<boolean>('database.synchronize');
  }

  get logging(): boolean {
    return this.configService.get<boolean>('database.logging');
  }

  get entities(): any[] {
    return this.configService.get<any[]>('database.entities');
  }
}
