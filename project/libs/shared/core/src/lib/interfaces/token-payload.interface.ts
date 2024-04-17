import { UserRole } from '../types/user-role.enum';

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  lastname: string;
  firstname: string;
}
