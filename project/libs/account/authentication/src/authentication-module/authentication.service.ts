import { Injectable } from '@nestjs/common';

import { BlogUserRepository } from '@project/blog-user';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}
}
