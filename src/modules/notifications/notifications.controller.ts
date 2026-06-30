import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { TokenPayload } from '../../utils/tokens/interfaces/token-payload.interface';
import { CreateThreadDto } from './dto/create-thread.dto';
import { SendMessageDto } from './dto/send-message.dto';
import {
  MessageResponse,
  ThreadResponse,
} from './@types/notification-response.interface';

@Controller('notifications/threads')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Roles(Role.MODERATOR)
  @Post()
  createThread(
    @CurrentUser() user: TokenPayload,
    @Body() dto: CreateThreadDto,
  ): Promise<ThreadResponse> {
    return this.notificationsService.createThread(user, dto);
  }

  @Roles(Role.MODERATOR)
  @Post(':threadId/messages')
  sendMessage(
    @CurrentUser() user: TokenPayload,
    @Param('threadId') threadId: string,
    @Body() dto: SendMessageDto,
  ): Promise<MessageResponse> {
    return this.notificationsService.sendMessage(user, threadId, dto);
  }

  @Get()
  listThreads(@CurrentUser() user: TokenPayload): Promise<ThreadResponse[]> {
    return this.notificationsService.listThreads(user);
  }

  @Get(':threadId/messages')
  getThreadMessages(
    @CurrentUser() user: TokenPayload,
    @Param('threadId') threadId: string,
  ): Promise<MessageResponse[]> {
    return this.notificationsService.getThreadMessages(user, threadId);
  }

  @Patch(':threadId/read')
  markThreadAsRead(
    @CurrentUser() user: TokenPayload,
    @Param('threadId') threadId: string,
  ): Promise<{ updated: number }> {
    return this.notificationsService.markThreadAsRead(user, threadId);
  }
}
