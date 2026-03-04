import { getMetadataArgsStorage } from 'typeorm';
import { BaseModelEntity } from 'src/models/entities/base.entity';
import { User } from 'src/models/users/entities/users.entity';

describe('User ORM entity', () => {
  const metadataStorage = getMetadataArgsStorage();

  it('extends the base model entity', () => {
    const user = new User();

    expect(user).toBeInstanceOf(BaseModelEntity);
  });

  it('maps to users table', () => {
    const table = metadataStorage.tables.find(
      (storedTable) => storedTable.target === User,
    );

    expect(table?.name).toBe('users');
  });

  it('inherits base columns and keeps user-specific columns', () => {
    const baseColumns = metadataStorage.columns
      .filter((column) => column.target === BaseModelEntity)
      .map((column) => column.propertyName);
    const userColumns = metadataStorage.columns
      .filter((column) => column.target === User)
      .map((column) => column.propertyName);

    expect(baseColumns).toEqual(
      expect.arrayContaining(['id', 'createdAt', 'updatedAt']),
    );
    expect(userColumns).toEqual(expect.arrayContaining(['email', 'password']));

    const createdAtColumn = metadataStorage.columns.find(
      (column) =>
        column.target === BaseModelEntity && column.propertyName === 'createdAt',
    );
    const updatedAtColumn = metadataStorage.columns.find(
      (column) =>
        column.target === BaseModelEntity && column.propertyName === 'updatedAt',
    );
    const idGeneration = metadataStorage.generations.find(
      (generation) =>
        generation.target === BaseModelEntity && generation.propertyName === 'id',
    );

    expect(createdAtColumn?.options.name).toBe('created_at');
    expect(updatedAtColumn?.options.name).toBe('updated_at');
    expect(idGeneration?.strategy).toBe('uuid');
  });
});
