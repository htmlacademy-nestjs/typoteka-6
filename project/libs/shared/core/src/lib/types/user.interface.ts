import { UserRole } from './user-role.enum';

export interface User {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  role: UserRole;
}
