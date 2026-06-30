import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mailerConfig from '../../configs/mailer.config';
import { MailerService } from './mailer.service';

@Module({
  imports: [ConfigModule.forFeature(mailerConfig)],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
