import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { ProductVariation } from './@types/product-variation.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductVariationQueryDto } from './dto/get-product-variation-query.dto';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';

@Injectable()
export class ProductVariationsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllVariations(
    productId: number,
    query: GetProductVariationQueryDto,
  ): Promise<GetResponseInterface<ProductVariation>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<ProductVariation>(
      `/products/${productId}/variations?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getVariation(productId: number, id: number): Promise<ProductVariation> {
    return await this.axiosService.get<ProductVariation>(
      `/products/${productId}/variations/${id}`,
    );
  }

  async createVariation(
    productId: number,
    dto: CreateProductVariationDto,
  ): Promise<ProductVariation> {
    return await this.axiosService.post<ProductVariation>(
      `/products/${productId}/variations`,
      dto,
    );
  }

  async updateVariation(
    productId: number,
    id: number,
    dto: UpdateProductVariationDto,
  ): Promise<ProductVariation> {
    return await this.axiosService.put<ProductVariation>(
      `/products/${productId}/variations/${id}`,
      dto,
    );
  }

  async deleteVariation(
    productId: number,
    id: number,
    force = true,
  ): Promise<ProductVariation> {
    return await this.axiosService.delete<ProductVariation>(
      `/products/${productId}/variations/${id}?force=${force}`,
    );
  }
}
