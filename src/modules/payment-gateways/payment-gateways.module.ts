import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { PaymentGatewaysController } from './payment-gateways.controller';
import { PaymentGatewaysService } from './payment-gateways.service';

@Module({
  imports: [AxiosModule],
  controllers: [PaymentGatewaysController],
  providers: [PaymentGatewaysService],
})
export class PaymentGatewaysModule {}
