import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { Product } from './@types/product.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductQueryDto } from './dto/get-product-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllProducts(
    query: GetProductQueryDto,
  ): Promise<GetResponseInterface<Product>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<Product>(
      `/products?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getProduct(id: number): Promise<Product> {
    return await this.axiosService.get<Product>(`/products/${id}`);
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    return await this.axiosService.post<Product>('/products', dto);
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    return await this.axiosService.put<Product>(`/products/${id}`, dto);
  }

  async deleteProduct(id: number, force = true): Promise<Product> {
    return await this.axiosService.delete<Product>(
      `/products/${id}?force=${force}`,
    );
  }
}
