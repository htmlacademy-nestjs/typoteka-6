import { TokenPayload } from '@project/shared/core';

export interface RequestWithTokenPayload {
  user?: TokenPayload
}
