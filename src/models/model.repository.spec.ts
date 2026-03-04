import { NotFoundException } from '@nestjs/common';
import { ModelRepository } from 'src/models/model.repository';

describe('ModelRepository', () => {
  it('queries by id when getting a model', async () => {
    const repository = Object.create(ModelRepository.prototype) as ModelRepository<
      { id: string },
      { id: string }
    > & {
      findOne: jest.Mock;
      transform: jest.Mock;
    };
    const model = { id: 'user-id' };
    const transformedModel = { id: 'user-id' };

    repository.findOne = jest.fn().mockResolvedValue(model);
    repository.transform = jest.fn().mockReturnValue(transformedModel);

    const result = await repository.get('user-id', ['profile']);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 'user-id' },
      relations: ['profile'],
    });
    expect(repository.transform).toHaveBeenCalledWith(model);
    expect(result).toEqual(transformedModel);
  });

  it('throws NotFoundException when requested', async () => {
    const repository = Object.create(ModelRepository.prototype) as ModelRepository<
      { id: string },
      { id: string }
    > & {
      findOne: jest.Mock;
      transform: jest.Mock;
    };

    repository.findOne = jest.fn().mockResolvedValue(null);
    repository.transform = jest.fn();

    await expect(repository.get('missing-id', [], true)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.transform).not.toHaveBeenCalled();
  });

  it('reloads created model with persisted id', async () => {
    const repository = Object.create(ModelRepository.prototype) as ModelRepository<
      { id: string; email: string },
      { id: string; email: string }
    > & {
      save: jest.Mock;
      get: jest.Mock;
    };
    const inputs = { email: 'user@example.com' };
    const createdRecord = { id: 'new-id' };
    const loadedRecord = { id: 'new-id', email: 'user@example.com' };

    repository.save = jest.fn().mockResolvedValue(createdRecord);
    repository.get = jest.fn().mockResolvedValue(loadedRecord);

    const result = await repository.createEntity(inputs, ['profile']);

    expect(repository.save).toHaveBeenCalledWith(inputs);
    expect(repository.get).toHaveBeenCalledWith('new-id', ['profile']);
    expect(result).toEqual(loadedRecord);
  });
});
