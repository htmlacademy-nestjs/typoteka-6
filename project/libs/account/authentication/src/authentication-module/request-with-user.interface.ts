import { BlogUserEntity } from '@project/blog-user';

export interface RequestWithUser {
  user?: BlogUserEntity;
}
