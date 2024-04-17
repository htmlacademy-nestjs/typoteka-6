import { Module } from '@nestjs/common';

import { BlogCategoryModule } from '@project/blog-category';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    BlogPostModule,
    BlogCategoryModule,
    BlogCommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
