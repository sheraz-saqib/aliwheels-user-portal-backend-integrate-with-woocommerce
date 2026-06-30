import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { TaxRate } from './@types/tax-rate.interface';
import { GetResponseInterface } from '../../utils/response/get-response.interface';
import { GetTaxRateQueryDto } from './dto/get-tax-rate-query.dto';
import { CreateTaxRateDto } from './dto/create-tax-rate.dto';
import { UpdateTaxRateDto } from './dto/update-tax-rate.dto';

@Injectable()
export class TaxRatesService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllTaxRates(
    query: GetTaxRateQueryDto,
  ): Promise<GetResponseInterface<TaxRate>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<TaxRate>(
      `/taxes?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getTaxRate(id: number): Promise<TaxRate> {
    return await this.axiosService.get<TaxRate>(`/taxes/${id}`);
  }

  async createTaxRate(dto: CreateTaxRateDto): Promise<TaxRate> {
    return await this.axiosService.post<TaxRate>('/taxes', dto);
  }

  async updateTaxRate(id: number, dto: UpdateTaxRateDto): Promise<TaxRate> {
    return await this.axiosService.put<TaxRate>(`/taxes/${id}`, dto);
  }

  async deleteTaxRate(id: number, force = true): Promise<TaxRate> {
    return await this.axiosService.delete<TaxRate>(
      `/taxes/${id}?force=${force}`,
    );
  }
}
