import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { Order } from './@types/order.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetOrderQueryDto } from './dto/get-order-query.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllOrders(
    query: GetOrderQueryDto,
  ): Promise<GetResponseInterface<Order>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<Order>(
      `/orders?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getOrder(id: number): Promise<Order> {
    return await this.axiosService.get<Order>(`/orders/${id}`);
  }

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    return await this.axiosService.post<Order>('/orders', dto);
  }

  async updateOrder(id: number, dto: UpdateOrderDto): Promise<Order> {
    return await this.axiosService.put<Order>(`/orders/${id}`, dto);
  }

  async deleteOrder(id: number, force = true): Promise<Order> {
    return await this.axiosService.delete<Order>(
      `/orders/${id}?force=${force}`,
    );
  }
}
