import { Controller, Get, Param } from '@nestjs/common';

import { BlogCommentService } from './blog-comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { fillDto } from '@project/shared/helpers';

@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService,
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = await this.blogCommentService.getComments(postId);
    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }
}
