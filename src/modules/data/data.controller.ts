import { Controller, Get, Param } from '@nestjs/common';
import { DataService } from './data.service';
import {
  Continent,
  Country,
  Currency,
  DataResource,
} from './@types/data.interface';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  getDataResources(): Promise<DataResource[]> {
    return this.dataService.getDataResources();
  }

  @Get('continents')
  getContinents(): Promise<Continent[]> {
    return this.dataService.getContinents();
  }

  @Get('continents/:location')
  getContinent(@Param('location') location: string): Promise<Continent> {
    return this.dataService.getContinent(location);
  }

  @Get('countries')
  getCountries(): Promise<Country[]> {
    return this.dataService.getCountries();
  }

  @Get('countries/:country')
  getCountry(@Param('country') country: string): Promise<Country> {
    return this.dataService.getCountry(country);
  }

  @Get('currencies')
  getCurrencies(): Promise<Currency[]> {
    return this.dataService.getCurrencies();
  }

  @Get('currencies/current')
  getCurrentCurrency(): Promise<Currency> {
    return this.dataService.getCurrentCurrency();
  }

  @Get('currencies/:currency')
  getCurrency(@Param('currency') currency: string): Promise<Currency> {
    return this.dataService.getCurrency(currency);
  }
}
