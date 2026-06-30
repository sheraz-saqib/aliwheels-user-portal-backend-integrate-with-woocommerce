import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductShippingClassesService } from './shipping-classes.service';
import { ProductShippingClass } from './@types/product-shipping-class.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductShippingClassQueryDto } from './dto/get-product-shipping-class-query.dto';
import { CreateProductShippingClassDto } from './dto/create-product-shipping-class.dto';
import { UpdateProductShippingClassDto } from './dto/update-product-shipping-class.dto';

@Controller('products/shipping_classes')
export class ProductShippingClassesController {
  constructor(
    private readonly productShippingClassesService: ProductShippingClassesService,
  ) {}

  @Get()
  getAllShippingClasses(
    @Query() query: GetProductShippingClassQueryDto,
  ): Promise<GetResponseInterface<ProductShippingClass>> {
    return this.productShippingClassesService.getAllShippingClasses(query);
  }

  @Get(':id')
  getShippingClass(@Param('id') id: number): Promise<ProductShippingClass> {
    return this.productShippingClassesService.getShippingClass(id);
  }

  @Post()
  createShippingClass(
    @Body() dto: CreateProductShippingClassDto,
  ): Promise<ProductShippingClass> {
    return this.productShippingClassesService.createShippingClass(dto);
  }

  @Put(':id')
  updateShippingClass(
    @Param('id') id: number,
    @Body() dto: UpdateProductShippingClassDto,
  ): Promise<ProductShippingClass> {
    return this.productShippingClassesService.updateShippingClass(id, dto);
  }

  @Delete(':id')
  deleteShippingClass(@Param('id') id: number): Promise<ProductShippingClass> {
    return this.productShippingClassesService.deleteShippingClass(id);
  }
}
