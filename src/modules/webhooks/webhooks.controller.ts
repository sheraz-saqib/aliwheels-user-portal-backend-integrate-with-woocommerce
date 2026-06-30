import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { Webhook } from './@types/webhook.interface';
import { GetResponseInterface } from '../../utils/response/get-response.interface';
import { GetWebhookQueryDto } from './dto/get-webhook-query.dto';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get()
  getAllWebhooks(
    @Query() query: GetWebhookQueryDto,
  ): Promise<GetResponseInterface<Webhook>> {
    return this.webhooksService.getAllWebhooks(query);
  }

  @Get(':id')
  getWebhook(@Param('id') id: number): Promise<Webhook> {
    return this.webhooksService.getWebhook(id);
  }

  @Post()
  createWebhook(@Body() dto: CreateWebhookDto): Promise<Webhook> {
    return this.webhooksService.createWebhook(dto);
  }

  @Put(':id')
  updateWebhook(
    @Param('id') id: number,
    @Body() dto: UpdateWebhookDto,
  ): Promise<Webhook> {
    return this.webhooksService.updateWebhook(id, dto);
  }

  @Delete(':id')
  deleteWebhook(@Param('id') id: number): Promise<Webhook> {
    return this.webhooksService.deleteWebhook(id);
  }
}
