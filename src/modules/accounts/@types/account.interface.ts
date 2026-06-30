export interface GetAccountByEmailOptions {
  email: string;
  withPassword?: boolean;
}

export interface CreateAccountOptions {
  email: string;
  name: string;
  password: string;
}

export interface UpdateVerificationSessionOptions {
  sessionId: string;
}

export interface UpdateRefreshTokenOptions {
  hashValue: string;
  expiresAt: Date;
}
