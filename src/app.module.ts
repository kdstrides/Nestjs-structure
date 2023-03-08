import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AppConfigModule } from 'src/config/app/config.module';
import { PostgresDatabaseProviderModule } from 'src/providers/database/provider.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AppConfigModule, PostgresDatabaseProviderModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
