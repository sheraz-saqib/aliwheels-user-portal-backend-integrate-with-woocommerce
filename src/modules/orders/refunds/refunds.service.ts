import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { OrderRefund } from './@types/order-refund.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetOrderRefundQueryDto } from './dto/get-order-refund-query.dto';
import { CreateOrderRefundDto } from './dto/create-order-refund.dto';

@Injectable()
export class OrderRefundsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllRefunds(
    orderId: number,
    query: GetOrderRefundQueryDto,
  ): Promise<GetResponseInterface<OrderRefund>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<OrderRefund>(
      `/orders/${orderId}/refunds?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getRefund(orderId: number, id: number): Promise<OrderRefund> {
    return await this.axiosService.get<OrderRefund>(
      `/orders/${orderId}/refunds/${id}`,
    );
  }

  async createRefund(
    orderId: number,
    dto: CreateOrderRefundDto,
  ): Promise<OrderRefund> {
    return await this.axiosService.post<OrderRefund>(
      `/orders/${orderId}/refunds`,
      dto,
    );
  }

  async deleteRefund(orderId: number, id: number): Promise<OrderRefund> {
    return await this.axiosService.delete<OrderRefund>(
      `/orders/${orderId}/refunds/${id}?force=true`,
    );
  }
}
