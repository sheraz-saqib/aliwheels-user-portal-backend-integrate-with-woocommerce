import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { ShippingMethod } from './@types/shipping-zone.interface';

@Injectable()
export class ShippingMethodsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllShippingMethods(): Promise<ShippingMethod[]> {
    return await this.axiosService.get<ShippingMethod[]>('/shipping_methods');
  }

  async getShippingMethod(id: string): Promise<ShippingMethod> {
    return await this.axiosService.get<ShippingMethod>(
      `/shipping_methods/${id}`,
    );
  }
}
