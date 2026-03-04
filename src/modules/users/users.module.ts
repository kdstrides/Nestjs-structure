import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UsersController } from 'src/modules/users/users.controller';
import { User } from 'src/models/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
