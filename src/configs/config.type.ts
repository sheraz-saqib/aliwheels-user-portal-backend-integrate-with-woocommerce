export interface ApiKey {
  publicKey: string;
  secretKey: string;
}

export interface AppConfigType {
  apikey: ApiKey;
}
