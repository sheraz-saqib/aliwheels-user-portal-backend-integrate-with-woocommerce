import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShippingZoneMethodsService } from './shipping-zone-methods.service';
import { ShippingZoneMethod } from './@types/shipping-zone.interface';
import { CreateShippingZoneMethodDto } from './dto/create-shipping-zone-method.dto';
import { UpdateShippingZoneMethodDto } from './dto/update-shipping-zone-method.dto';

@Controller('shipping/zones/:zoneId/methods')
export class ShippingZoneMethodsController {
  constructor(
    private readonly shippingZoneMethodsService: ShippingZoneMethodsService,
  ) {}

  @Get()
  getAllMethods(
    @Param('zoneId') zoneId: number,
  ): Promise<ShippingZoneMethod[]> {
    return this.shippingZoneMethodsService.getAllMethods(zoneId);
  }

  @Get(':id')
  getMethod(
    @Param('zoneId') zoneId: number,
    @Param('id') id: number,
  ): Promise<ShippingZoneMethod> {
    return this.shippingZoneMethodsService.getMethod(zoneId, id);
  }

  @Post()
  createMethod(
    @Param('zoneId') zoneId: number,
    @Body() dto: CreateShippingZoneMethodDto,
  ): Promise<ShippingZoneMethod> {
    return this.shippingZoneMethodsService.createMethod(zoneId, dto);
  }

  @Put(':id')
  updateMethod(
    @Param('zoneId') zoneId: number,
    @Param('id') id: number,
    @Body() dto: UpdateShippingZoneMethodDto,
  ): Promise<ShippingZoneMethod> {
    return this.shippingZoneMethodsService.updateMethod(zoneId, id, dto);
  }

  @Delete(':id')
  deleteMethod(
    @Param('zoneId') zoneId: number,
    @Param('id') id: number,
  ): Promise<ShippingZoneMethod> {
    return this.shippingZoneMethodsService.deleteMethod(zoneId, id);
  }
}
