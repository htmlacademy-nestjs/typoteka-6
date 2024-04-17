import { Expose } from 'class-transformer';

import { BlogPostRdo } from './blog-post.rdo';

export class BlogPostWithPaginationRdo {
  @Expose()
  public entities: BlogPostRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
