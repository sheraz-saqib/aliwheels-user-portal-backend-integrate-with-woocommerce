import { Request } from 'express';
import { TokenPayload } from '../../utils/tokens/interfaces/token-payload.interface';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}
