import { Role } from '../../../common/enums/role.enum';

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
  isVerified: boolean;
}
