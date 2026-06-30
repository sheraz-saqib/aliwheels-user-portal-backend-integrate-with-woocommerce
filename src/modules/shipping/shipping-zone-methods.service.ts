import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { ShippingZoneMethod } from './@types/shipping-zone.interface';
import { CreateShippingZoneMethodDto } from './dto/create-shipping-zone-method.dto';
import { UpdateShippingZoneMethodDto } from './dto/update-shipping-zone-method.dto';

@Injectable()
export class ShippingZoneMethodsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllMethods(zoneId: number): Promise<ShippingZoneMethod[]> {
    return await this.axiosService.get<ShippingZoneMethod[]>(
      `/shipping/zones/${zoneId}/methods`,
    );
  }

  async getMethod(zoneId: number, id: number): Promise<ShippingZoneMethod> {
    return await this.axiosService.get<ShippingZoneMethod>(
      `/shipping/zones/${zoneId}/methods/${id}`,
    );
  }

  async createMethod(
    zoneId: number,
    dto: CreateShippingZoneMethodDto,
  ): Promise<ShippingZoneMethod> {
    return await this.axiosService.post<ShippingZoneMethod>(
      `/shipping/zones/${zoneId}/methods`,
      dto,
    );
  }

  async updateMethod(
    zoneId: number,
    id: number,
    dto: UpdateShippingZoneMethodDto,
  ): Promise<ShippingZoneMethod> {
    return await this.axiosService.put<ShippingZoneMethod>(
      `/shipping/zones/${zoneId}/methods/${id}`,
      dto,
    );
  }

  async deleteMethod(
    zoneId: number,
    id: number,
    force = true,
  ): Promise<ShippingZoneMethod> {
    return await this.axiosService.delete<ShippingZoneMethod>(
      `/shipping/zones/${zoneId}/methods/${id}?force=${force}`,
    );
  }
}
