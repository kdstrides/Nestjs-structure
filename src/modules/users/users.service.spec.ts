import { UsersService } from 'src/modules/users/users.service';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/models/users/serializers/users.serializer';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: jest.Mocked<
    Pick<UsersRepository, 'get' | 'createEntity' | 'updateEntity'>
  >;

  beforeEach(() => {
    usersRepository = {
      get: jest.fn(),
      createEntity: jest.fn(),
      updateEntity: jest.fn(),
    };

    service = new UsersService(usersRepository as unknown as UsersRepository);
  });

  it('updates user with correct argument order', async () => {
    const user = { id: 'user-id' } as UserEntity;
    const inputs = { email: 'updated@test.com' };
    const updatedUser = {
      ...user,
      ...inputs,
    } as UserEntity;

    usersRepository.updateEntity.mockResolvedValue(updatedUser);

    const result = await service.update(user, inputs);

    expect(usersRepository.updateEntity).toHaveBeenCalledWith(user, inputs);
    expect(result).toBe(updatedUser);
  });
});
