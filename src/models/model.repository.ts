import { plainToClass } from 'class-transformer';
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NotFoundException } from '@nestjs/common';
import { ModelEntity } from 'src/common/serializers/model.serializer';

export class ModelRepository<
  T extends { id: string },
  K extends ModelEntity,
> extends Repository<T> {
  async get(
    id: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<K | null> {
    const entity = await this.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations,
    });

    if (!entity && throwsException) {
      throw new NotFoundException('Model not found.');
    }

    return entity ? this.transform(entity) : null;
  }

  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<K> {
    const entity = await this.save(inputs);
    return (await this.get(entity.id, relations, true)) as K;
  }

  async updateEntity(
    entity: K,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = [],
  ): Promise<K> {
    await this.update(entity.id, inputs);
    return (await this.get(entity.id, relations, true)) as K;
  }

  transform(model: T, transformOptions = {}): K {
    return plainToClass(ModelEntity, model, transformOptions) as K;
  }

  transformMany(models: T[], transformOptions = {}): K[] {
    return models.map((model) => this.transform(model, transformOptions));
  }
}
