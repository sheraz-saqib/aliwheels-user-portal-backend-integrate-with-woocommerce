import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { ProductAttribute } from './@types/product-attribute.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductAttributeQueryDto } from './dto/get-product-attribute-query.dto';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';

@Injectable()
export class ProductAttributesService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllAttributes(
    query: GetProductAttributeQueryDto,
  ): Promise<GetResponseInterface<ProductAttribute>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<ProductAttribute>(
      `/products/attributes?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getAttribute(id: number): Promise<ProductAttribute> {
    return await this.axiosService.get<ProductAttribute>(
      `/products/attributes/${id}`,
    );
  }

  async createAttribute(
    dto: CreateProductAttributeDto,
  ): Promise<ProductAttribute> {
    return await this.axiosService.post<ProductAttribute>(
      '/products/attributes',
      dto,
    );
  }

  async updateAttribute(
    id: number,
    dto: UpdateProductAttributeDto,
  ): Promise<ProductAttribute> {
    return await this.axiosService.put<ProductAttribute>(
      `/products/attributes/${id}`,
      dto,
    );
  }

  async deleteAttribute(id: number, force = true): Promise<ProductAttribute> {
    return await this.axiosService.delete<ProductAttribute>(
      `/products/attributes/${id}?force=${force}`,
    );
  }
}
