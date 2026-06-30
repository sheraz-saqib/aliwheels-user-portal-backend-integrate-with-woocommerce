import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { Webhook } from './@types/webhook.interface';
import { GetResponseInterface } from '../../utils/response/get-response.interface';
import { GetWebhookQueryDto } from './dto/get-webhook-query.dto';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Injectable()
export class WebhooksService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllWebhooks(
    query: GetWebhookQueryDto,
  ): Promise<GetResponseInterface<Webhook>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<Webhook>(
      `/webhooks?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getWebhook(id: number): Promise<Webhook> {
    return await this.axiosService.get<Webhook>(`/webhooks/${id}`);
  }

  async createWebhook(dto: CreateWebhookDto): Promise<Webhook> {
    return await this.axiosService.post<Webhook>('/webhooks', dto);
  }

  async updateWebhook(id: number, dto: UpdateWebhookDto): Promise<Webhook> {
    return await this.axiosService.put<Webhook>(`/webhooks/${id}`, dto);
  }

  async deleteWebhook(id: number, force = true): Promise<Webhook> {
    return await this.axiosService.delete<Webhook>(
      `/webhooks/${id}?force=${force}`,
    );
  }
}
