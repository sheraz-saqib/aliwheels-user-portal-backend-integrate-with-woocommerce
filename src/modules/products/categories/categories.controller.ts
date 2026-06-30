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
import { ProductCategoriesService } from './categories.service';
import { ProductCategory } from './@types/product-category.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductCategoryQueryDto } from './dto/get-product-category-query.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Controller('products/categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Get()
  getAllCategories(
    @Query() query: GetProductCategoryQueryDto,
  ): Promise<GetResponseInterface<ProductCategory>> {
    return this.productCategoriesService.getAllCategories(query);
  }

  @Get(':id')
  getCategory(@Param('id') id: number): Promise<ProductCategory> {
    return this.productCategoriesService.getCategory(id);
  }

  @Post()
  createCategory(
    @Body() dto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoriesService.createCategory(dto);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: number,
    @Body() dto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoriesService.updateCategory(id, dto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number): Promise<ProductCategory> {
    return this.productCategoriesService.deleteCategory(id);
  }
}
