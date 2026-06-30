import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { TaxRatesController } from './tax-rates.controller';
import { TaxClassesController } from './tax-classes.controller';
import { TaxRatesService } from './tax-rates.service';
import { TaxClassesService } from './tax-classes.service';

@Module({
  imports: [AxiosModule],
  controllers: [TaxClassesController, TaxRatesController],
  providers: [TaxRatesService, TaxClassesService],
})
export class TaxesModule {}
