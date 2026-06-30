import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { Resend } from 'resend';
import mailerConfig from '../../configs/mailer.config';
import {
  SendEmailPayload,
  SendNotificationEmailPayload,
  SendVerificationEmailPayload,
} from './interfaces/send-email.interface';

@Injectable()
export class MailerService {
  private readonly resendClient: Resend;
  private readonly logger = new Logger(MailerService.name);

  constructor(
    @Inject(mailerConfig.KEY)
    private readonly config: ConfigType<typeof mailerConfig>,
  ) {
    this.resendClient = new Resend(this.config.resendApiKey);
  }

  async sendEmail(payload: SendEmailPayload): Promise<void> {
    try {
      await this.resendClient.emails.send({
        from: this.config.emailFrom,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      });
      this.logger.log(`Email sent successfully to: ${payload.to}`);
    } catch {
      throw new InternalServerErrorException('Email sending failed');
    }
  }

  async sendVerificationEmail(
    payload: SendVerificationEmailPayload,
  ): Promise<void> {
    const link = `${this.config.backendUrl}/auth/verify-email?token=${payload.token}`;

    await this.sendEmail({
      to: payload.to,
      subject: 'Verify your email',
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${link}">${link}</a>
      `,
    });
  }

  async sendNotificationEmail(
    payload: SendNotificationEmailPayload,
  ): Promise<void> {
    await this.sendEmail({
      to: payload.to,
      subject: payload.subject,
      html: `
        <h2>${payload.subject}</h2>
        <p>You have a new message from ${payload.senderName}:</p>
        <p>${payload.message}</p>
        <a href="${this.config.frontendUrl}/notifications">View notification</a>
      `,
    });
  }
}
