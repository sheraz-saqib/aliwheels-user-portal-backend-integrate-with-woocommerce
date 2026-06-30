import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from '../accounts/accounts.module';
import { MailerModule } from '../../utils/mailer/mailer.module';
import {
  NotificationThread,
  NotificationThreadSchema,
} from './schemas/notification-thread.schema';
import {
  NotificationMessage,
  NotificationMessageSchema,
} from './schemas/notification-message.schema';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationThread.name, schema: NotificationThreadSchema },
      { name: NotificationMessage.name, schema: NotificationMessageSchema },
    ]),
    AccountsModule,
    MailerModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
