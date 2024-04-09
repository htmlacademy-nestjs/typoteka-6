import { Module } from '@nestjs/common';

import { BlogCategoryModule } from '@project/blog-category'

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BlogCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
