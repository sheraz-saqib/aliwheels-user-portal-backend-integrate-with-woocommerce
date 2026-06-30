import { Role } from '../../../common/enums/role.enum';

export interface AccountResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
  isVerified: boolean;
  isActive: boolean;
}
