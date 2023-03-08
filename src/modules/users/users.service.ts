import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/models/users/serializers/users.serializer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}
  async get(
    id: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserEntity | null> {
    return await this.usersRepository.get(id, relations, throwsException);
  }
  async create(inputs: any): Promise<UserEntity> {
    return await this.usersRepository.createEntity(inputs);
  }
  async update(user: UserEntity, inputs: any): Promise<UserEntity> {
    return await this.usersRepository.updateEntity(inputs, null);
  }
}
