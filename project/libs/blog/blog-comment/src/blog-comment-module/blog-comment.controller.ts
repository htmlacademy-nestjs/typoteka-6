import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { BlogCommentService } from './blog-comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { fillDto } from '@project/shared/helpers';
import { CreateCommentDto } from './dto/create-comment.dto';

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

  @Post('/')
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.createComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

}
