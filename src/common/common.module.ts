import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import authConfig from '../configs/auth.config';
import { AccountsModule } from '../modules/accounts/accounts.module';
import { TokensModule } from '../utils/tokens/tokens.module';
import { CookiesModule } from '../utils/cookies/cookies.module';
import { CryptoModule } from '../utils/crypto/crypto.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RolesGuard } from './guards/roles.guard';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    AccountsModule,
    TokensModule,
    CookiesModule,
    CryptoModule,
  ],
  providers: [
    AuthMiddleware,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthMiddleware, TokensModule, CookiesModule, CryptoModule],
})
export class CommonModule {}
