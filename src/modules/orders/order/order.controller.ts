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
import { OrdersService } from './order.service';
import { Order } from './@types/order.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetOrderQueryDto } from './dto/get-order-query.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAllOrders(
    @Query() query: GetOrderQueryDto,
  ): Promise<GetResponseInterface<Order>> {
    return this.ordersService.getAllOrders(query);
  }

  @Get(':id')
  getOrder(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getOrder(id);
  }

  @Post()
  createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(dto);
  }

  @Put(':id')
  updateOrder(
    @Param('id') id: number,
    @Body() dto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.updateOrder(id, dto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number): Promise<Order> {
    return this.ordersService.deleteOrder(id);
  }
}
