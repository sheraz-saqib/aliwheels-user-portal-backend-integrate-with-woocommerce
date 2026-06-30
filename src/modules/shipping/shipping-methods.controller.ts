import { Controller, Get, Param } from '@nestjs/common';
import { ShippingMethodsService } from './shipping-methods.service';
import { ShippingMethod } from './@types/shipping-zone.interface';

@Controller('shipping_methods')
export class ShippingMethodsController {
  constructor(
    private readonly shippingMethodsService: ShippingMethodsService,
  ) {}

  @Get()
  getAllShippingMethods(): Promise<ShippingMethod[]> {
    return this.shippingMethodsService.getAllShippingMethods();
  }

  @Get(':id')
  getShippingMethod(@Param('id') id: string): Promise<ShippingMethod> {
    return this.shippingMethodsService.getShippingMethod(id);
  }
}
