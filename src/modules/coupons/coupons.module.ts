import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';

@Module({
  imports: [AxiosModule],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
