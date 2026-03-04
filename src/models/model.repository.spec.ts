import { NotFoundException } from '@nestjs/common';
import { ModelEntity } from 'src/common/serializers/model.serializer';
import { ModelRepository } from './model.repository';

type TestModel = {
  id: string;
  email: string;
};

type TestSerializedModel = ModelEntity & {
  email: string;
};

describe('ModelRepository', () => {
  let repository: ModelRepository<TestModel, TestSerializedModel>;

  beforeEach(() => {
    repository = Object.create(
      ModelRepository.prototype,
    ) as ModelRepository<TestModel, TestSerializedModel>;
  });

  it('should query by id when getting an entity', async () => {
    const dbEntity: TestModel = {
      id: 'user-1',
      email: 'test@example.com',
    };
    const serializedEntity: TestSerializedModel = {
      id: 'user-1',
      email: 'test@example.com',
    };

    (repository as any).findOne = jest.fn().mockResolvedValue(dbEntity);
    (repository as any).transform = jest.fn().mockReturnValue(serializedEntity);

    const result = await repository.get('user-1', ['profile']);

    expect((repository as any).findOne).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      relations: ['profile'],
    });
    expect((repository as any).transform).toHaveBeenCalledWith(dbEntity);
    expect(result).toBe(serializedEntity);
  });

  it('should throw when the entity is missing and throw flag is enabled', async () => {
    (repository as any).findOne = jest.fn().mockResolvedValue(null);

    await expect(repository.get('missing-id', [], true)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should fetch the saved entity by generated id on create', async () => {
    const createdEntity: TestSerializedModel = {
      id: 'created-id',
      email: 'created@example.com',
    };

    (repository as any).save = jest
      .fn()
      .mockResolvedValue({ id: 'created-id', email: 'created@example.com' });
    (repository as any).get = jest.fn().mockResolvedValue(createdEntity);

    const result = await repository.createEntity({
      email: 'created@example.com',
    });

    expect((repository as any).save).toHaveBeenCalledWith({
      email: 'created@example.com',
    });
    expect((repository as any).get).toHaveBeenCalledWith('created-id', [], true);
    expect(result).toBe(createdEntity);
  });

  it('should update using the entity id and refetch updated model', async () => {
    const updatedEntity: TestSerializedModel = {
      id: 'updated-id',
      email: 'updated@example.com',
    };

    (repository as any).update = jest.fn().mockResolvedValue(undefined);
    (repository as any).get = jest.fn().mockResolvedValue(updatedEntity);

    const result = await repository.updateEntity(
      { id: 'updated-id' } as TestSerializedModel,
      { email: 'updated@example.com' },
      ['profile'],
    );

    expect((repository as any).update).toHaveBeenCalledWith('updated-id', {
      email: 'updated@example.com',
    });
    expect((repository as any).get).toHaveBeenCalledWith(
      'updated-id',
      ['profile'],
      true,
    );
    expect(result).toBe(updatedEntity);
  });
});
