import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { ProductReview } from './@types/product-review.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductReviewQueryDto } from './dto/get-product-review-query.dto';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';

@Injectable()
export class ProductReviewsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllReviews(
    query: GetProductReviewQueryDto,
  ): Promise<GetResponseInterface<ProductReview>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<ProductReview>(
      `/products/reviews?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getReview(id: number): Promise<ProductReview> {
    return await this.axiosService.get<ProductReview>(
      `/products/reviews/${id}`,
    );
  }

  async createReview(dto: CreateProductReviewDto): Promise<ProductReview> {
    return await this.axiosService.post<ProductReview>(
      '/products/reviews',
      dto,
    );
  }

  async updateReview(
    id: number,
    dto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    return await this.axiosService.put<ProductReview>(
      `/products/reviews/${id}`,
      dto,
    );
  }

  async deleteReview(id: number, force = true): Promise<ProductReview> {
    return await this.axiosService.delete<ProductReview>(
      `/products/reviews/${id}?force=${force}`,
    );
  }
}
