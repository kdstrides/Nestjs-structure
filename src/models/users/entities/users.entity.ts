import {
  Entity,
  Column,
} from 'typeorm';
import { IUser } from 'src/models/users/interfaces/users.interface';
import { Base } from 'src/models/base.entity';

@Entity({ name: 'users' })
export class User extends Base implements IUser {

  @Column()
  email: string;

  @Column()
  password: string;
}
