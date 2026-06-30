import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { ProductCategory } from './@types/product-category.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductCategoryQueryDto } from './dto/get-product-category-query.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllCategories(
    query: GetProductCategoryQueryDto,
  ): Promise<GetResponseInterface<ProductCategory>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<ProductCategory>(
      `/products/categories?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getCategory(id: number): Promise<ProductCategory> {
    return await this.axiosService.get<ProductCategory>(
      `/products/categories/${id}`,
    );
  }

  async createCategory(
    dto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return await this.axiosService.post<ProductCategory>(
      '/products/categories',
      dto,
    );
  }

  async updateCategory(
    id: number,
    dto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    return await this.axiosService.put<ProductCategory>(
      `/products/categories/${id}`,
      dto,
    );
  }

  async deleteCategory(id: number, force = true): Promise<ProductCategory> {
    return await this.axiosService.delete<ProductCategory>(
      `/products/categories/${id}?force=${force}`,
    );
  }
}
