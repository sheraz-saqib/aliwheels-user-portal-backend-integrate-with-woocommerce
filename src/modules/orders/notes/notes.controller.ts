import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OrderNotesService } from './notes.service';
import { OrderNote } from './@types/order-note.interface';
import { GetOrderNoteQueryDto } from './dto/get-order-note-query.dto';
import { CreateOrderNoteDto } from './dto/create-order-note.dto';

@Controller('orders/:orderId/notes')
export class OrderNotesController {
  constructor(private readonly orderNotesService: OrderNotesService) {}

  @Get()
  getAllNotes(
    @Param('orderId') orderId: number,
    @Query() query: GetOrderNoteQueryDto,
  ): Promise<OrderNote[]> {
    return this.orderNotesService.getAllNotes(orderId, query);
  }

  @Get(':id')
  getNote(
    @Param('orderId') orderId: number,
    @Param('id') id: number,
  ): Promise<OrderNote> {
    return this.orderNotesService.getNote(orderId, id);
  }

  @Post()
  createNote(
    @Param('orderId') orderId: number,
    @Body() dto: CreateOrderNoteDto,
  ): Promise<OrderNote> {
    return this.orderNotesService.createNote(orderId, dto);
  }

  @Delete(':id')
  deleteNote(
    @Param('orderId') orderId: number,
    @Param('id') id: number,
  ): Promise<OrderNote> {
    return this.orderNotesService.deleteNote(orderId, id);
  }
}
