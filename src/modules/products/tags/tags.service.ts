import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { ProductTag } from './@types/product-tag.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductTagQueryDto } from './dto/get-product-tag-query.dto';
import { CreateProductTagDto } from './dto/create-product-tag.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.dto';

@Injectable()
export class ProductTagsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllTags(
    query: GetProductTagQueryDto,
  ): Promise<GetResponseInterface<ProductTag>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<ProductTag>(
      `/products/tags?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getTag(id: number): Promise<ProductTag> {
    return await this.axiosService.get<ProductTag>(`/products/tags/${id}`);
  }

  async createTag(dto: CreateProductTagDto): Promise<ProductTag> {
    return await this.axiosService.post<ProductTag>('/products/tags', dto);
  }

  async updateTag(id: number, dto: UpdateProductTagDto): Promise<ProductTag> {
    return await this.axiosService.put<ProductTag>(`/products/tags/${id}`, dto);
  }

  async deleteTag(id: number, force = true): Promise<ProductTag> {
    return await this.axiosService.delete<ProductTag>(
      `/products/tags/${id}?force=${force}`,
    );
  }
}
