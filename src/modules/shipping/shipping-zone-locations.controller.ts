import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ShippingZoneLocationsService } from './shipping-zone-locations.service';
import { ShippingZoneLocation } from './@types/shipping-zone.interface';
import { UpdateShippingZoneLocationsDto } from './dto/update-shipping-zone-locations.dto';

@Controller('shipping/zones/:zoneId/locations')
export class ShippingZoneLocationsController {
  constructor(
    private readonly shippingZoneLocationsService: ShippingZoneLocationsService,
  ) {}

  @Get()
  getLocations(
    @Param('zoneId') zoneId: number,
  ): Promise<ShippingZoneLocation[]> {
    return this.shippingZoneLocationsService.getLocations(zoneId);
  }

  @Put()
  updateLocations(
    @Param('zoneId') zoneId: number,
    @Body() dto: UpdateShippingZoneLocationsDto,
  ): Promise<ShippingZoneLocation[]> {
    return this.shippingZoneLocationsService.updateLocations(zoneId, dto);
  }
}
