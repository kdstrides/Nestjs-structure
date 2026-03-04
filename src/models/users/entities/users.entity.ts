import { Entity, Column } from 'typeorm';
import { BaseModelEntity } from 'src/models/entities/base.entity';
import { IUser } from 'src/models/users/interfaces/users.interface';

@Entity({ name: 'users' })
export class User extends BaseModelEntity implements IUser {
  @Column()
  email: string;

  @Column()
  password: string;
}
