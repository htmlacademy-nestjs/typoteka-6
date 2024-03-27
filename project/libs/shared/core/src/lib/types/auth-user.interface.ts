import { User } from './user.interface';

export interface AuthUser extends User {
  passwordHash: string;
}
