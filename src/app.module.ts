import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AppConfigModule } from 'src/config/app/config.module';
import { PostgresDatabaseProviderModule } from 'src/providers/database/provider.module';

@Module({
  imports: [AppConfigModule, PostgresDatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
