import { Prisma } from '@prisma/client';

export interface CategoryFilter {
  id?: string;
  title?: string;
}

export function categoryFilterToPrismaFilter(filter: CategoryFilter): Prisma.CategoryWhereInput | undefined {
  if (! filter) {
    return undefined;
  }

  let prismaFilter: Prisma.CategoryWhereInput = {};

  if (filter.title) {
    prismaFilter = { title: filter.title };
  }

  return prismaFilter;
}

