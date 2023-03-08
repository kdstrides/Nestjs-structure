import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';
import { DatabaseConfigModule } from 'src/config/database/config.module';
import { DatabaseConfigService } from 'src/config/database/config.service';
import { UserEntity } from 'src/models/users/serializers/users.serializer';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (postgresConfigService: DatabaseConfigService) => ({
        type: 'postgres' as DatabaseType,
        port: postgresConfigService.port,
        host: postgresConfigService.host,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
        synchronize: Boolean(postgresConfigService.synchronize),
        logging: Boolean(postgresConfigService.logging),
        entities: [UserEntity],
      }),
      inject: [DatabaseConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresDatabaseProviderModule {}
