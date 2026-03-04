import { getMetadataArgsStorage } from 'typeorm';
import { BaseEntity } from 'src/models/entities/base.entity';
import { User } from 'src/models/users/entities/users.entity';

describe('User entity', () => {
  it('should extend the shared base entity', () => {
    const user = new User();

    expect(user).toBeInstanceOf(BaseEntity);
  });

  it('should define user-specific columns', () => {
    const columns = getMetadataArgsStorage().columns.filter(
      ({ target }) => target === User,
    );

    expect(columns.map(({ propertyName }) => propertyName)).toEqual(
      expect.arrayContaining(['email', 'password']),
    );
  });

  it('should define shared base entity columns', () => {
    const baseColumns = getMetadataArgsStorage().columns.filter(
      ({ target }) => target === BaseEntity,
    );
    const generatedColumns = getMetadataArgsStorage().generations.filter(
      ({ target }) => target === BaseEntity,
    );

    expect(baseColumns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          propertyName: 'createdAt',
          options: expect.objectContaining({ name: 'created_at' }),
        }),
        expect.objectContaining({
          propertyName: 'updatedAt',
          options: expect.objectContaining({ name: 'updated_at' }),
        }),
      ]),
    );

    expect(generatedColumns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          propertyName: 'id',
          strategy: 'uuid',
        }),
      ]),
    );
  });
});
