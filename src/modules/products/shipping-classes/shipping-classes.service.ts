import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { ProductShippingClass } from './@types/product-shipping-class.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductShippingClassQueryDto } from './dto/get-product-shipping-class-query.dto';
import { CreateProductShippingClassDto } from './dto/create-product-shipping-class.dto';
import { UpdateProductShippingClassDto } from './dto/update-product-shipping-class.dto';

@Injectable()
export class ProductShippingClassesService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllShippingClasses(
    query: GetProductShippingClassQueryDto,
  ): Promise<GetResponseInterface<ProductShippingClass>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<ProductShippingClass>(
      `/products/shipping_classes?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getShippingClass(id: number): Promise<ProductShippingClass> {
    return await this.axiosService.get<ProductShippingClass>(
      `/products/shipping_classes/${id}`,
    );
  }

  async createShippingClass(
    dto: CreateProductShippingClassDto,
  ): Promise<ProductShippingClass> {
    return await this.axiosService.post<ProductShippingClass>(
      '/products/shipping_classes',
      dto,
    );
  }

  async updateShippingClass(
    id: number,
    dto: UpdateProductShippingClassDto,
  ): Promise<ProductShippingClass> {
    return await this.axiosService.put<ProductShippingClass>(
      `/products/shipping_classes/${id}`,
      dto,
    );
  }

  async deleteShippingClass(
    id: number,
    force = true,
  ): Promise<ProductShippingClass> {
    return await this.axiosService.delete<ProductShippingClass>(
      `/products/shipping_classes/${id}?force=${force}`,
    );
  }
}
