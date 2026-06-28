import { registerAs } from '@nestjs/config';
import { ApiKey } from './config.type';

const apiKeyConfig = registerAs('apikey', (): ApiKey => ({
  publicKey: process.env.WC_PUBLIC_KEY!,
  secretKey: process.env.WC_SECRET_KEY!,
}));

export default apiKeyConfig;
