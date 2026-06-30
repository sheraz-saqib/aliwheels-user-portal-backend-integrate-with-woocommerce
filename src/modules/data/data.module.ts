import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [AxiosModule],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
