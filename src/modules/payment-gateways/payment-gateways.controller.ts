import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PaymentGatewaysService } from './payment-gateways.service';
import { PaymentGateway } from './@types/payment-gateway.interface';
import { UpdatePaymentGatewayDto } from './dto/update-payment-gateway.dto';

@Controller('payment_gateways')
export class PaymentGatewaysController {
  constructor(
    private readonly paymentGatewaysService: PaymentGatewaysService,
  ) {}

  @Get()
  getAllGateways(): Promise<PaymentGateway[]> {
    return this.paymentGatewaysService.getAllGateways();
  }

  @Get(':id')
  getGateway(@Param('id') id: string): Promise<PaymentGateway> {
    return this.paymentGatewaysService.getGateway(id);
  }

  @Put(':id')
  updateGateway(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentGatewayDto,
  ): Promise<PaymentGateway> {
    return this.paymentGatewaysService.updateGateway(id, dto);
  }
}
