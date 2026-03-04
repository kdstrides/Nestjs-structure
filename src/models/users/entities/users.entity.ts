import {
  Entity,
  Column,
} from 'typeorm';
import { Base } from 'src/models/base.entity';
import { IUser } from 'src/models/users/interfaces/users.interface';

@Entity({ name: 'users' })
export class User extends Base implements IUser {
  @Column()
  email: string;

  @Column()
  password: string;
}
