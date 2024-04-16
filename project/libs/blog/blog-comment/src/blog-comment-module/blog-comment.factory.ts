import { Injectable } from '@nestjs/common';

import { Comment, EntityFactory } from '@project/shared/core';
import { BlogCommentEntity } from './blog-comment.entity';

@Injectable()
export class BlogCommentFactory implements EntityFactory<BlogCommentEntity> {
  public create(entityPlainData: Comment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }
}
