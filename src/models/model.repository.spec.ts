import { ModelRepository } from 'src/models/model.repository';
import { ModelEntity } from 'src/common/serializers/model.serializer';

type TestRepository = ModelRepository<{ id: string }, ModelEntity> & {
  findOne: jest.Mock;
  transform: jest.Mock;
};

describe('ModelRepository', () => {
  const createRepository = (): TestRepository => {
    const repository = Object.create(ModelRepository.prototype) as TestRepository;
    repository.findOne = jest.fn();
    repository.transform = jest.fn((entity) => entity);

    return repository;
  };

  it('queries entity by id and relations', async () => {
    const repository = createRepository();
    const entity = { id: 'user-id' };

    repository.findOne.mockResolvedValue(entity);

    const result = await repository.get('user-id', ['profile']);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: {
        id: 'user-id',
      },
      relations: ['profile'],
    });
    expect(repository.transform).toHaveBeenCalledWith(entity);
    expect(result).toEqual(entity);
  });

  it('returns null when entity is not found', async () => {
    const repository = createRepository();

    repository.findOne.mockResolvedValue(null);

    await expect(repository.get('missing-id')).resolves.toBeNull();
  });

  it('throws when entity is not found and exception requested', async () => {
    const repository = createRepository();

    repository.findOne.mockResolvedValue(null);

    await expect(repository.get('missing-id', [], true)).rejects.toThrow(
      'Model not found.',
    );
  });
});
