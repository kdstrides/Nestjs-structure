import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UsersController } from 'src/modules/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
