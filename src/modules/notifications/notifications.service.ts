import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountsService } from '../accounts/accounts.service';
import { MailerService } from '../../utils/mailer/mailer.service';
import { Role } from '../../common/enums/role.enum';
import { TokenPayload } from '../../utils/tokens/interfaces/token-payload.interface';
import {
  NotificationThread,
  NotificationThreadDocument,
} from './schemas/notification-thread.schema';
import {
  NotificationMessage,
  NotificationMessageDocument,
} from './schemas/notification-message.schema';
import { CreateThreadDto } from './dto/create-thread.dto';
import { SendMessageDto } from './dto/send-message.dto';
import {
  MessageResponse,
  ThreadResponse,
} from './@types/notification-response.interface';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationThread.name)
    private readonly threadModel: Model<NotificationThreadDocument>,
    @InjectModel(NotificationMessage.name)
    private readonly messageModel: Model<NotificationMessageDocument>,
    private readonly accountsService: AccountsService,
    private readonly mailerService: MailerService,
  ) {}

  async createThread(
    sender: TokenPayload,
    dto: CreateThreadDto,
  ): Promise<ThreadResponse> {
    const participant = await this.accountsService.getAccountById(
      dto.participantId,
    );

    if (!participant) {
      throw new NotFoundException('Participant account not found');
    }

    const thread = await this.threadModel.create({
      subject: dto.subject,
      participantId: dto.participantId,
      createdBy: sender.id,
    });

    await this.messageModel.create({
      threadId: thread.id,
      senderId: sender.id,
      message: dto.message,
    });

    await this.mailerService.sendNotificationEmail({
      to: participant.email,
      subject: dto.subject,
      message: dto.message,
      senderName: sender.name,
    });

    return this.toThreadResponse(thread);
  }

  async sendMessage(
    sender: TokenPayload,
    threadId: string,
    dto: SendMessageDto,
  ): Promise<MessageResponse> {
    const thread = await this.threadModel.findById(threadId).exec();

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    const participant = await this.accountsService.getAccountById(
      thread.participantId.toString(),
    );

    if (!participant) {
      throw new NotFoundException('Participant account not found');
    }

    const message = await this.messageModel.create({
      threadId: thread.id,
      senderId: sender.id,
      message: dto.message,
    });

    await this.mailerService.sendNotificationEmail({
      to: participant.email,
      subject: thread.subject,
      message: dto.message,
      senderName: sender.name,
    });

    return this.toMessageResponse(message);
  }

  async listThreads(user: TokenPayload): Promise<ThreadResponse[]> {
    const isStaff = user.role === Role.ADMIN || user.role === Role.MODERATOR;

    const threads = await this.threadModel
      .find(isStaff ? {} : { participantId: user.id })
      .sort({ createdAt: -1 })
      .exec();

    return threads.map((thread) => this.toThreadResponse(thread));
  }

  async getThreadMessages(
    user: TokenPayload,
    threadId: string,
  ): Promise<MessageResponse[]> {
    const thread = await this.getAuthorizedThread(user, threadId);

    const messages = await this.messageModel
      .find({ threadId: thread.id })
      .sort({ createdAt: 1 })
      .exec();

    return messages.map((message) => this.toMessageResponse(message));
  }

  async markThreadAsRead(
    user: TokenPayload,
    threadId: string,
  ): Promise<{ updated: number }> {
    const thread = await this.getAuthorizedThread(user, threadId);

    const result = await this.messageModel
      .updateMany(
        {
          threadId: thread.id,
          senderId: { $ne: user.id },
          readAt: null,
        },
        { $set: { readAt: new Date() } },
      )
      .exec();

    return { updated: result.modifiedCount };
  }

  private async getAuthorizedThread(
    user: TokenPayload,
    threadId: string,
  ): Promise<NotificationThreadDocument> {
    const thread = await this.threadModel.findById(threadId).exec();

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    const isStaff = user.role === Role.ADMIN || user.role === Role.MODERATOR;
    const isParticipant = thread.participantId.toString() === user.id;

    if (!isStaff && !isParticipant) {
      throw new ForbiddenException('You cannot access this thread');
    }

    return thread;
  }

  private toThreadResponse(thread: NotificationThreadDocument): ThreadResponse {
    return {
      id: thread.id,
      subject: thread.subject,
      participantId: thread.participantId.toString(),
      createdBy: thread.createdBy.toString(),
      createdAt: thread.createdAt,
    };
  }

  private toMessageResponse(
    message: NotificationMessageDocument,
  ): MessageResponse {
    return {
      id: message.id,
      threadId: message.threadId.toString(),
      senderId: message.senderId.toString(),
      message: message.message,
      readAt: message.readAt,
      createdAt: message.createdAt,
    };
  }
}
