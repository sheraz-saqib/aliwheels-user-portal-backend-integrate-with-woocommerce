import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { OrdersController } from './order/order.controller';
import { OrderNotesController } from './notes/notes.controller';
import { OrderRefundsController } from './refunds/refunds.controller';
import { OrdersService } from './order/order.service';
import { OrderNotesService } from './notes/notes.service';
import { OrderRefundsService } from './refunds/refunds.service';

@Module({
  imports: [AxiosModule],
  controllers: [OrderNotesController, OrderRefundsController, OrdersController],
  providers: [OrdersService, OrderNotesService, OrderRefundsService],
})
export class OrdersModule {}
