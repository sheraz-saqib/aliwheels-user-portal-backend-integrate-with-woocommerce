import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { ShippingZoneLocation } from './@types/shipping-zone.interface';
import { UpdateShippingZoneLocationsDto } from './dto/update-shipping-zone-locations.dto';

@Injectable()
export class ShippingZoneLocationsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getLocations(zoneId: number): Promise<ShippingZoneLocation[]> {
    return await this.axiosService.get<ShippingZoneLocation[]>(
      `/shipping/zones/${zoneId}/locations`,
    );
  }

  async updateLocations(
    zoneId: number,
    dto: UpdateShippingZoneLocationsDto,
  ): Promise<ShippingZoneLocation[]> {
    return await this.axiosService.put<ShippingZoneLocation[]>(
      `/shipping/zones/${zoneId}/locations`,
      dto.locations,
    );
  }
}
