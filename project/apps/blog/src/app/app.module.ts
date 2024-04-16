import { Module } from '@nestjs/common';

import { BlogCategoryModule } from '@project/blog-category';
import { BlogCommentModule } from '@project/blog-comment';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [BlogCategoryModule, BlogCommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
