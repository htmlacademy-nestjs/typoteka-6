import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import { Category } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';

import { BlogCategoryEntity } from './blog-category.entity';
import { BlogCategoryFactory } from './blog-category.factory';
import { CategoryFilter, categoryFilterToPrismaFilter } from './blog-category.filter';
import { MAX_CATEGORY_LIMIT } from './blog-category.constant';

@Injectable()
export class BlogCategoryRepository extends BasePostgresRepository<BlogCategoryEntity, Category> {
  constructor(
    entityFactory: BlogCategoryFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogCategoryEntity): Promise<void> {
    const record = await this.client.category.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<BlogCategoryEntity> {
    const document = await this.client.category.findFirst({
      where: {
        id,
      },
    });

    if (! document) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: CategoryFilter): Promise<BlogCategoryEntity[]> {
    const where = filter ?? categoryFilterToPrismaFilter(filter);

    const documents = await this.client.category.findMany({
      where,
      take: MAX_CATEGORY_LIMIT
    });


    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.category.delete({
      where: {
        id,
      }
    });
  }

  public async update(entity: BlogCategoryEntity): Promise<void> {
    await this.client.category.update({
      where: { id: entity.id },
      data: {
        title: entity.title,
      }
    });
  }

  public async findByIds(ids: string[]): Promise<BlogCategoryEntity[]> {
    const records = await this.client.category.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
