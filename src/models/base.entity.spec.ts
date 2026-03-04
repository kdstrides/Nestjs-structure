import { getMetadataArgsStorage } from 'typeorm';
import { Base } from 'src/models/base.entity';
import { User } from 'src/models/users/entities/users.entity';

describe('Base Entity', () => {
  it('defines shared primary key and timestamps', () => {
    const metadata = getMetadataArgsStorage();
    const baseColumns = metadata.columns.filter(
      (column) => column.target === Base,
    );
    const baseColumnNames = baseColumns.map((column) => column.propertyName);

    expect(baseColumnNames).toEqual(
      expect.arrayContaining(['id', 'createdAt', 'updatedAt']),
    );

    const idGeneration = metadata.generations.find(
      (generation) => generation.target === Base && generation.propertyName === 'id',
    );
    expect(idGeneration?.strategy).toBe('uuid');
  });

  it('is inherited by the user entity', () => {
    const metadata = getMetadataArgsStorage();
    const userTable = metadata.tables.find((table) => table.target === User);
    const userColumns = metadata.columns.filter((column) => column.target === User);
    const userColumnNames = userColumns.map((column) => column.propertyName);

    expect(Object.getPrototypeOf(User.prototype)).toBe(Base.prototype);
    expect(userTable?.name).toBe('users');
    expect(userColumnNames).toEqual(expect.arrayContaining(['email', 'password']));
  });
});
