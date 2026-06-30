import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { ShippingZonesController } from './shipping-zones.controller';
import { ShippingZoneLocationsController } from './shipping-zone-locations.controller';
import { ShippingZoneMethodsController } from './shipping-zone-methods.controller';
import { ShippingMethodsController } from './shipping-methods.controller';
import { ShippingZonesService } from './shipping-zones.service';
import { ShippingZoneLocationsService } from './shipping-zone-locations.service';
import { ShippingZoneMethodsService } from './shipping-zone-methods.service';
import { ShippingMethodsService } from './shipping-methods.service';

@Module({
  imports: [AxiosModule],
  controllers: [
    ShippingZoneLocationsController,
    ShippingZoneMethodsController,
    ShippingZonesController,
    ShippingMethodsController,
  ],
  providers: [
    ShippingZonesService,
    ShippingZoneLocationsService,
    ShippingZoneMethodsService,
    ShippingMethodsService,
  ],
})
export class ShippingModule {}
