import { Role } from '../../../common/enums/role.enum';

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface VerifyTokenPayload {
  id: string;
  sessionId: string;
}
