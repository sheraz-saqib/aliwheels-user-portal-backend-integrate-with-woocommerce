export interface ApiKey {
  publicKey: string;
  secretKey: string;
}

export interface AppConfigType {
  apikey: ApiKey;
  apiBaseUrl: string;
}

export interface DatabaseConfigType {
  uri: string;
}

export interface JwtConfig {
  accessTokenSecret: string;
  accessTokenExpireIn: string;
  refreshTokenSecret: string;
  refreshTokenExpireIn: string;
  verifyTokenSecret: string;
  verifyTokenExpireIn: string;
}

export interface AuthConfigType {
  jwt: JwtConfig;
  isProduction: boolean;
}

export interface MailerConfigType {
  resendApiKey: string;
  emailFrom: string;
  frontendUrl: string;
  backendUrl: string;
}
