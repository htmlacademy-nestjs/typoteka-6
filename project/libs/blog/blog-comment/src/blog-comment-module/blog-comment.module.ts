
import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';

import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentFactory } from './blog-comment.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository, BlogCommentFactory],
  exports: [BlogCommentRepository, BlogCommentFactory]
})
export class BlogCommentModule {}
