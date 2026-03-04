import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/models/users/serializers/users.serializer';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: {
    get: jest.Mock;
    createEntity: jest.Mock;
    updateEntity: jest.Mock;
  };

  beforeEach(async () => {
    usersRepository = {
      get: jest.fn(),
      createEntity: jest.fn(),
      updateEntity: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: usersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should call updateEntity with user then inputs', async () => {
    const user = { id: 'user-1' } as UserEntity;
    const inputs = { email: 'updated@example.com' };
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
