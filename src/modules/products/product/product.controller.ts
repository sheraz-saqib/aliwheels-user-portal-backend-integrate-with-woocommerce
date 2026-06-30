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
import { ProductsService } from './product.service';
import { Product } from './@types/product.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductQueryDto } from './dto/get-product-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(
    @Query() query: GetProductQueryDto,
  ): Promise<GetResponseInterface<Product>> {
    return this.productsService.getAllProducts(query);
  }

  @Get(':id')
  getProduct(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProduct(id);
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(dto);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}
