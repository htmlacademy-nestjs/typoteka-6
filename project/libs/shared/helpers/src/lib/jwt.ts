import { User, TokenPayload } from '@project/shared/core';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    lastname: user.lastname,
    firstname: user.firstname,
  };
}
