import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { PaymentGateway } from './@types/payment-gateway.interface';
import { UpdatePaymentGatewayDto } from './dto/update-payment-gateway.dto';

@Injectable()
export class PaymentGatewaysService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllGateways(): Promise<PaymentGateway[]> {
    return await this.axiosService.get<PaymentGateway[]>('/payment_gateways');
  }

  async getGateway(id: string): Promise<PaymentGateway> {
    return await this.axiosService.get<PaymentGateway>(
      `/payment_gateways/${id}`,
    );
  }

  async updateGateway(
    id: string,
    dto: UpdatePaymentGatewayDto,
  ): Promise<PaymentGateway> {
    return await this.axiosService.put<PaymentGateway>(
      `/payment_gateways/${id}`,
      dto,
    );
  }
}
