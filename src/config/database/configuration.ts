import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from 'src/config/database/config.interface';

export default registerAs('database', (): DatabaseConfig => ({
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: Number(process.env.POSTGRES_PORT),
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  entities: [],
}));
