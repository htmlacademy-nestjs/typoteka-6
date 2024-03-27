import { StorableEntity } from './storable-entity.interface';

export interface EntityFactory<T extends StorableEntity<ReturnType<T['toPOJO']>>> {
  create(entityPlainData: ReturnType<T['toPOJO']>): T;
}
