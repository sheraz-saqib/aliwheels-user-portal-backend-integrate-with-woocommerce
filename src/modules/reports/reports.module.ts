import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [AxiosModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
