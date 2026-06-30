import { registerAs } from '@nestjs/config';
import { AuthConfigType } from './config.type';

const authConfig = registerAs('auth', (): AuthConfigType => ({
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET!,
    accessTokenExpireIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN!,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET!,
    refreshTokenExpireIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN!,
    verifyTokenSecret: process.env.JWT_VERIFY_TOKEN_SECRET!,
    verifyTokenExpireIn: process.env.JWT_VERIFY_TOKEN_EXPIRE_IN!,
  },
  isProduction: process.env.NODE_ENV === 'production',
}));

export default authConfig;
