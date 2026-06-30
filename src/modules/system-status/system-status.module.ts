import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { SystemStatusController } from './system-status.controller';
import { SystemStatusService } from './system-status.service';

@Module({
  imports: [AxiosModule],
  controllers: [SystemStatusController],
  providers: [SystemStatusService],
})
export class SystemStatusModule {}
