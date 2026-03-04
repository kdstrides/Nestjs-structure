import { Entity, Column } from 'typeorm';
import { IUser } from 'src/models/users/interfaces/users.interface';
import { BaseEntity } from 'src/models/entities/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @Column()
  email: string;

  @Column()
  password: string;
}
