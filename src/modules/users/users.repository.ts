import { User } from 'src/models/users/entities/users.entity';
import { ModelRepository } from 'src/models/model.repository';
import { UserEntity } from 'src/models/users/serializers/users.serializer';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { allUserGroupsForSerializing } from 'src/models/users/serializers/users.serializer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends ModelRepository<User, UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
      repository: Repository<UserEntity>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  transform(model: User): UserEntity {
    const tranformOptions = {
      groups: allUserGroupsForSerializing,
    };
    return plainToClass(
      UserEntity,
      instanceToPlain(model, tranformOptions),
      tranformOptions,
    );
  }

  transformMany(models: User[]): UserEntity[] {
    return models.map((model) => this.transform(model));
  }
}
