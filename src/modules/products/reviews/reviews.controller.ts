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
import { ProductReviewsService } from './reviews.service';
import { ProductReview } from './@types/product-review.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductReviewQueryDto } from './dto/get-product-review-query.dto';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';

@Controller('products/reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Get()
  getAllReviews(
    @Query() query: GetProductReviewQueryDto,
  ): Promise<GetResponseInterface<ProductReview>> {
    return this.productReviewsService.getAllReviews(query);
  }

  @Get(':id')
  getReview(@Param('id') id: number): Promise<ProductReview> {
    return this.productReviewsService.getReview(id);
  }

  @Post()
  createReview(@Body() dto: CreateProductReviewDto): Promise<ProductReview> {
    return this.productReviewsService.createReview(dto);
  }

  @Put(':id')
  updateReview(
    @Param('id') id: number,
    @Body() dto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    return this.productReviewsService.updateReview(id, dto);
  }

  @Delete(':id')
  deleteReview(@Param('id') id: number): Promise<ProductReview> {
    return this.productReviewsService.deleteReview(id);
  }
}
