import { Injectable } from '@nestjs/common';

import { Category, EntityFactory } from '@project/shared/core';
import { BlogCategoryEntity } from './blog-category.entity';

@Injectable()
export class BlogCategoryFactory implements EntityFactory<BlogCategoryEntity> {
  public create(entityPlainData: Category): BlogCategoryEntity {
    return new BlogCategoryEntity(entityPlainData);
  }
}
