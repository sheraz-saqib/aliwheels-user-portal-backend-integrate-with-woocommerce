import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from '../../configs/auth.config';
import { CryptoModule } from '../crypto/crypto.module';
import { CookiesService } from './cookies.service';

@Module({
  imports: [ConfigModule.forFeature(authConfig), CryptoModule],
  providers: [CookiesService],
  exports: [CookiesService],
})
export class CookiesModule {}
