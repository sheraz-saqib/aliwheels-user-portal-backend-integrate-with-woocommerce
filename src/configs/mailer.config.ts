import { registerAs } from '@nestjs/config';
import { MailerConfigType } from './config.type';

const mailerConfig = registerAs('mailer', (): MailerConfigType => ({
  resendApiKey: process.env.RESEND_API_KEY!,
  emailFrom: process.env.EMAIL_FROM!,
  frontendUrl: process.env.FRONTEND_URL!,
  backendUrl: process.env.BACKEND_URL!,
}));

export default mailerConfig;
