import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import {
  Continent,
  Country,
  Currency,
  DataResource,
} from './@types/data.interface';

@Injectable()
export class DataService {
  constructor(private readonly axiosService: AxiosService) {}

  async getDataResources(): Promise<DataResource[]> {
    return await this.axiosService.get<DataResource[]>('/data');
  }

  async getContinents(): Promise<Continent[]> {
    return await this.axiosService.get<Continent[]>('/data/continents');
  }

  async getContinent(location: string): Promise<Continent> {
    return await this.axiosService.get<Continent>(
      `/data/continents/${location}`,
    );
  }

  async getCountries(): Promise<Country[]> {
    return await this.axiosService.get<Country[]>('/data/countries');
  }

  async getCountry(country: string): Promise<Country> {
    return await this.axiosService.get<Country>(`/data/countries/${country}`);
  }

  async getCurrencies(): Promise<Currency[]> {
    return await this.axiosService.get<Currency[]>('/data/currencies');
  }

  async getCurrentCurrency(): Promise<Currency> {
    return await this.axiosService.get<Currency>('/data/currencies/current');
  }

  async getCurrency(currency: string): Promise<Currency> {
    return await this.axiosService.get<Currency>(
      `/data/currencies/${currency}`,
    );
  }
}
