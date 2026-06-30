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
import { ProductAttributesService } from './attributes.service';
import { ProductAttribute } from './@types/product-attribute.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductAttributeQueryDto } from './dto/get-product-attribute-query.dto';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';

@Controller('products/attributes')
export class ProductAttributesController {
  constructor(
    private readonly productAttributesService: ProductAttributesService,
  ) {}

  @Get()
  getAllAttributes(
    @Query() query: GetProductAttributeQueryDto,
  ): Promise<GetResponseInterface<ProductAttribute>> {
    return this.productAttributesService.getAllAttributes(query);
  }

  @Get(':id')
  getAttribute(@Param('id') id: number): Promise<ProductAttribute> {
    return this.productAttributesService.getAttribute(id);
  }

  @Post()
  createAttribute(
    @Body() dto: CreateProductAttributeDto,
  ): Promise<ProductAttribute> {
    return this.productAttributesService.createAttribute(dto);
  }

  @Put(':id')
  updateAttribute(
    @Param('id') id: number,
    @Body() dto: UpdateProductAttributeDto,
  ): Promise<ProductAttribute> {
    return this.productAttributesService.updateAttribute(id, dto);
  }

  @Delete(':id')
  deleteAttribute(@Param('id') id: number): Promise<ProductAttribute> {
    return this.productAttributesService.deleteAttribute(id);
  }
}
