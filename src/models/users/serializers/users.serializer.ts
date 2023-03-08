import { Expose } from 'class-transformer';
import { IUser } from 'src/models/users/interfaces/users.interface';
import { ModelEntity } from 'src/common/serializers/model.serializer';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];
export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];
export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
];
export class UserEntity extends ModelEntity implements IUser {
  id: string;
  email: string;

  @Expose({ groups: ['user.password'] })
  password: string;

  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
