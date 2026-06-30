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
import { ProductVariationsService } from './variations.service';
import { ProductVariation } from './@types/product-variation.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductVariationQueryDto } from './dto/get-product-variation-query.dto';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';

@Controller('products/:productId/variations')
export class ProductVariationsController {
  constructor(
    private readonly productVariationsService: ProductVariationsService,
  ) {}

  @Get()
  getAllVariations(
    @Param('productId') productId: number,
    @Query() query: GetProductVariationQueryDto,
  ): Promise<GetResponseInterface<ProductVariation>> {
    return this.productVariationsService.getAllVariations(productId, query);
  }

  @Get(':id')
  getVariation(
    @Param('productId') productId: number,
    @Param('id') id: number,
  ): Promise<ProductVariation> {
    return this.productVariationsService.getVariation(productId, id);
  }

  @Post()
  createVariation(
    @Param('productId') productId: number,
    @Body() dto: CreateProductVariationDto,
  ): Promise<ProductVariation> {
    return this.productVariationsService.createVariation(productId, dto);
  }

  @Put(':id')
  updateVariation(
    @Param('productId') productId: number,
    @Param('id') id: number,
    @Body() dto: UpdateProductVariationDto,
  ): Promise<ProductVariation> {
    return this.productVariationsService.updateVariation(productId, id, dto);
  }

  @Delete(':id')
  deleteVariation(
    @Param('productId') productId: number,
    @Param('id') id: number,
  ): Promise<ProductVariation> {
    return this.productVariationsService.deleteVariation(productId, id);
  }
}
