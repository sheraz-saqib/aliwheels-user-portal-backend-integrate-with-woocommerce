import { registerAs } from '@nestjs/config';
import { AppConfigType } from './config.type';
import apiKeyConfig from './api-key.config';

const appConfig = registerAs('app', (): AppConfigType => ({
  apikey: apiKeyConfig(),
  apiBaseUrl: process.env.WC_BASE_URL!,
}));

export default appConfig;
