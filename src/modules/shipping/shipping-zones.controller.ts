import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShippingZonesService } from './shipping-zones.service';
import { ShippingZone } from './@types/shipping-zone.interface';
import { CreateShippingZoneDto } from './dto/create-shipping-zone.dto';
import { UpdateShippingZoneDto } from './dto/update-shipping-zone.dto';

@Controller('shipping/zones')
export class ShippingZonesController {
  constructor(private readonly shippingZonesService: ShippingZonesService) {}

  @Get()
  getAllZones(): Promise<ShippingZone[]> {
    return this.shippingZonesService.getAllZones();
  }

  @Get(':id')
  getZone(@Param('id') id: number): Promise<ShippingZone> {
    return this.shippingZonesService.getZone(id);
  }

  @Post()
  createZone(@Body() dto: CreateShippingZoneDto): Promise<ShippingZone> {
    return this.shippingZonesService.createZone(dto);
  }

  @Put(':id')
  updateZone(
    @Param('id') id: number,
    @Body() dto: UpdateShippingZoneDto,
  ): Promise<ShippingZone> {
    return this.shippingZonesService.updateZone(id, dto);
  }

  @Delete(':id')
  deleteZone(@Param('id') id: number): Promise<ShippingZone> {
    return this.shippingZonesService.deleteZone(id);
  }
}
