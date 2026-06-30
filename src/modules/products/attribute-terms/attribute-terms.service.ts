import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { ProductAttributeTerm } from './@types/product-attribute-term.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductAttributeTermQueryDto } from './dto/get-product-attribute-term-query.dto';
import { CreateProductAttributeTermDto } from './dto/create-product-attribute-term.dto';
import { UpdateProductAttributeTermDto } from './dto/update-product-attribute-term.dto';

@Injectable()
export class ProductAttributeTermsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllTerms(
    attributeId: number,
    query: GetProductAttributeTermQueryDto,
  ): Promise<GetResponseInterface<ProductAttributeTerm>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<ProductAttributeTerm>(
      `/products/attributes/${attributeId}/terms?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getTerm(
    attributeId: number,
    id: number,
  ): Promise<ProductAttributeTerm> {
    return await this.axiosService.get<ProductAttributeTerm>(
      `/products/attributes/${attributeId}/terms/${id}`,
    );
  }

  async createTerm(
    attributeId: number,
    dto: CreateProductAttributeTermDto,
  ): Promise<ProductAttributeTerm> {
    return await this.axiosService.post<ProductAttributeTerm>(
      `/products/attributes/${attributeId}/terms`,
      dto,
    );
  }

  async updateTerm(
    attributeId: number,
    id: number,
    dto: UpdateProductAttributeTermDto,
  ): Promise<ProductAttributeTerm> {
    return await this.axiosService.put<ProductAttributeTerm>(
      `/products/attributes/${attributeId}/terms/${id}`,
      dto,
    );
  }

  async deleteTerm(
    attributeId: number,
    id: number,
    force = true,
  ): Promise<ProductAttributeTerm> {
    return await this.axiosService.delete<ProductAttributeTerm>(
      `/products/attributes/${attributeId}/terms/${id}?force=${force}`,
    );
  }
}
