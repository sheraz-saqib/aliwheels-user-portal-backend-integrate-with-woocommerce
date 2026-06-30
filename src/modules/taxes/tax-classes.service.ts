import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { TaxClass } from './@types/tax-class.interface';
import { CreateTaxClassDto } from './dto/create-tax-class.dto';

@Injectable()
export class TaxClassesService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllTaxClasses(): Promise<TaxClass[]> {
    return await this.axiosService.get<TaxClass[]>('/taxes/classes');
  }

  async createTaxClass(dto: CreateTaxClassDto): Promise<TaxClass> {
    return await this.axiosService.post<TaxClass>('/taxes/classes', dto);
  }

  async deleteTaxClass(slug: string): Promise<TaxClass> {
    return await this.axiosService.delete<TaxClass>(
      `/taxes/classes/${slug}?force=true`,
    );
  }
}
