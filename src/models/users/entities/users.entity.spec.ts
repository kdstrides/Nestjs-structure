import { getMetadataArgsStorage } from 'typeorm';
import { Base } from 'src/models/base.entity';
import { User } from 'src/models/users/entities/users.entity';

describe('User entity metadata', () => {
  const metadataStorage = getMetadataArgsStorage();

  it('maps user entity to users table', () => {
    const table = metadataStorage.tables.find(
      (metadata) => metadata.target === User,
    );

    expect(table?.name).toBe('users');
  });

  it('inherits id and timestamps from base entity', () => {
    expect(Object.getPrototypeOf(User.prototype)).toBe(Base.prototype);

    const idColumn = metadataStorage.columns.find(
      (metadata) =>
        metadata.target === Base && metadata.propertyName === 'id',
    );
    const idGeneration = metadataStorage.generations.find(
      (metadata) =>
        metadata.target === Base && metadata.propertyName === 'id',
    );
    const createdAtColumn = metadataStorage.columns.find(
      (metadata) =>
        metadata.target === Base && metadata.propertyName === 'createdAt',
    );
    const updatedAtColumn = metadataStorage.columns.find(
      (metadata) =>
        metadata.target === Base && metadata.propertyName === 'updatedAt',
    );

    expect(idColumn).toBeDefined();
    expect(idGeneration?.strategy).toBe('uuid');
    expect(createdAtColumn?.options).toMatchObject({
      name: 'created_at',
      type: 'timestamp',
    });
    expect(updatedAtColumn?.options).toMatchObject({
      name: 'updated_at',
      type: 'timestamp',
    });
  });

  it('defines email and password columns on user entity', () => {
    const emailColumn = metadataStorage.columns.find(
      (metadata) =>
        metadata.target === User && metadata.propertyName === 'email',
    );
    const passwordColumn = metadataStorage.columns.find(
      (metadata) =>
        metadata.target === User && metadata.propertyName === 'password',
    );

    expect(emailColumn).toBeDefined();
    expect(passwordColumn).toBeDefined();
  });
});
