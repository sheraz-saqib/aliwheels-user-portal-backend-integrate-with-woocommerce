import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from '../../configs/auth.config';
import { AccountsModule } from '../accounts/accounts.module';
import { TokensModule } from '../../utils/tokens/tokens.module';
import { CookiesModule } from '../../utils/cookies/cookies.module';
import { CryptoModule } from '../../utils/crypto/crypto.module';
import { MailerModule } from '../../utils/mailer/mailer.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    AccountsModule,
    TokensModule,
    CookiesModule,
    CryptoModule,
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
