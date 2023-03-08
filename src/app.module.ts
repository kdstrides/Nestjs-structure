import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AppConfigModule } from 'src/config/app/config.module';
import { DatabaseConfigModule } from 'src/config/database/config.module';
import { DatabaseConfigService } from 'src/config/database/config.service';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (
        configService: DatabaseConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        port: configService.port,
        host: configService.host,
        username: configService.username,
        password: configService.password,
        database: configService.database,
        synchronize: Boolean(configService.synchronize),
        logging: Boolean(configService.logging),
        entities: Array(configService.entities),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
