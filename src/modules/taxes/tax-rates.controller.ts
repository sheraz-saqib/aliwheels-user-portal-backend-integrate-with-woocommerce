import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaxRatesService } from './tax-rates.service';
import { TaxRate } from './@types/tax-rate.interface';
import { GetResponseInterface } from '../../utils/response/get-response.interface';
import { GetTaxRateQueryDto } from './dto/get-tax-rate-query.dto';
import { CreateTaxRateDto } from './dto/create-tax-rate.dto';
import { UpdateTaxRateDto } from './dto/update-tax-rate.dto';

@Controller('taxes')
export class TaxRatesController {
  constructor(private readonly taxRatesService: TaxRatesService) {}

  @Get()
  getAllTaxRates(
    @Query() query: GetTaxRateQueryDto,
  ): Promise<GetResponseInterface<TaxRate>> {
    return this.taxRatesService.getAllTaxRates(query);
  }

  @Get(':id')
  getTaxRate(@Param('id') id: number): Promise<TaxRate> {
    return this.taxRatesService.getTaxRate(id);
  }

  @Post()
  createTaxRate(@Body() dto: CreateTaxRateDto): Promise<TaxRate> {
    return this.taxRatesService.createTaxRate(dto);
  }

  @Put(':id')
  updateTaxRate(
    @Param('id') id: number,
    @Body() dto: UpdateTaxRateDto,
  ): Promise<TaxRate> {
    return this.taxRatesService.updateTaxRate(id, dto);
  }

  @Delete(':id')
  deleteTaxRate(@Param('id') id: number): Promise<TaxRate> {
    return this.taxRatesService.deleteTaxRate(id);
  }
}
