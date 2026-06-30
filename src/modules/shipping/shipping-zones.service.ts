import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { ShippingZone } from './@types/shipping-zone.interface';
import { CreateShippingZoneDto } from './dto/create-shipping-zone.dto';
import { UpdateShippingZoneDto } from './dto/update-shipping-zone.dto';

@Injectable()
export class ShippingZonesService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllZones(): Promise<ShippingZone[]> {
    return await this.axiosService.get<ShippingZone[]>('/shipping/zones');
  }

  async getZone(id: number): Promise<ShippingZone> {
    return await this.axiosService.get<ShippingZone>(`/shipping/zones/${id}`);
  }

  async createZone(dto: CreateShippingZoneDto): Promise<ShippingZone> {
    return await this.axiosService.post<ShippingZone>('/shipping/zones', dto);
  }

  async updateZone(
    id: number,
    dto: UpdateShippingZoneDto,
  ): Promise<ShippingZone> {
    return await this.axiosService.put<ShippingZone>(
      `/shipping/zones/${id}`,
      dto,
    );
  }

  async deleteZone(id: number, force = true): Promise<ShippingZone> {
    return await this.axiosService.delete<ShippingZone>(
      `/shipping/zones/${id}?force=${force}`,
    );
  }
}
