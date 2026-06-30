import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaxClassesService } from './tax-classes.service';
import { TaxClass } from './@types/tax-class.interface';
import { CreateTaxClassDto } from './dto/create-tax-class.dto';

@Controller('taxes/classes')
export class TaxClassesController {
  constructor(private readonly taxClassesService: TaxClassesService) {}

  @Get()
  getAllTaxClasses(): Promise<TaxClass[]> {
    return this.taxClassesService.getAllTaxClasses();
  }

  @Post()
  createTaxClass(@Body() dto: CreateTaxClassDto): Promise<TaxClass> {
    return this.taxClassesService.createTaxClass(dto);
  }

  @Delete(':slug')
  deleteTaxClass(@Param('slug') slug: string): Promise<TaxClass> {
    return this.taxClassesService.deleteTaxClass(slug);
  }
}
