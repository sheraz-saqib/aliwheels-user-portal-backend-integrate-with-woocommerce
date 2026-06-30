import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OrderRefundsService } from './refunds.service';
import { OrderRefund } from './@types/order-refund.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetOrderRefundQueryDto } from './dto/get-order-refund-query.dto';
import { CreateOrderRefundDto } from './dto/create-order-refund.dto';

@Controller('orders/:orderId/refunds')
export class OrderRefundsController {
  constructor(private readonly orderRefundsService: OrderRefundsService) {}

  @Get()
  getAllRefunds(
    @Param('orderId') orderId: number,
    @Query() query: GetOrderRefundQueryDto,
  ): Promise<GetResponseInterface<OrderRefund>> {
    return this.orderRefundsService.getAllRefunds(orderId, query);
  }

  @Get(':id')
  getRefund(
    @Param('orderId') orderId: number,
    @Param('id') id: number,
  ): Promise<OrderRefund> {
    return this.orderRefundsService.getRefund(orderId, id);
  }

  @Post()
  createRefund(
    @Param('orderId') orderId: number,
    @Body() dto: CreateOrderRefundDto,
  ): Promise<OrderRefund> {
    return this.orderRefundsService.createRefund(orderId, dto);
  }

  @Delete(':id')
  deleteRefund(
    @Param('orderId') orderId: number,
    @Param('id') id: number,
  ): Promise<OrderRefund> {
    return this.orderRefundsService.deleteRefund(orderId, id);
  }
}
