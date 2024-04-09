import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';

import { BlogCategoryService } from './blog-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRdo } from './rdo/category.rdo';

@Controller('categories')
export class BlogCategoryController {
  constructor(
    private readonly blogCategoryService: BlogCategoryService
  ) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const categoryEntity = await this.blogCategoryService.getCategory(id);
    return fillDto(CategoryRdo, categoryEntity.toPOJO());
  }

  @Get('/')
  public async index() {
    const blogCategoryEntities = await this.blogCategoryService.getAllCategories();
    const categories = blogCategoryEntities.map((blogCategory) => blogCategory.toPOJO());
    return fillDto(CategoryRdo, categories);
  }

  @Post('/')
  public async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.blogCategoryService.createCategory(dto);
    return fillDto(CategoryRdo, newCategory.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.blogCategoryService.deleteCategory(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.blogCategoryService.updateCategory(id, dto);
    return fillDto(CategoryRdo, updatedCategory.toPOJO());
  }
}
