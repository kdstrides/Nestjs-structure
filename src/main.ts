import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { AppConfigService } from 'src/config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: AppConfigService = app.get(AppConfigService);

  await app.listen(appConfig.port);
}
bootstrap();
