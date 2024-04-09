import { Entity } from '@project/shared/core';
import { StorableEntity, Category } from '@project/shared/core';

export class BlogCategoryEntity extends Entity implements StorableEntity<Category> {
  public title: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(category?: Category) {
    super();
    this.populate(category);
  }

  public populate(category?: Category) {
    if (! category) {
      return;
    }

    this.id = category.id ?? undefined;
    this.title = category.title;
    this.createdAt = category.createdAt ?? undefined;
    this.updatedAt = category.updatedAt ?? undefined;
  }

  public toPOJO(): Category {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
