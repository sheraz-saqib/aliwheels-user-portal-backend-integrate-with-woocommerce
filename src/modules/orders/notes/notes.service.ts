import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../../utils/axios/axios.service';
import { OrderNote } from './@types/order-note.interface';
import { GetOrderNoteQueryDto } from './dto/get-order-note-query.dto';
import { CreateOrderNoteDto } from './dto/create-order-note.dto';

@Injectable()
export class OrderNotesService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllNotes(
    orderId: number,
    query: GetOrderNoteQueryDto,
  ): Promise<OrderNote[]> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.get<OrderNote[]>(
      `/orders/${orderId}/notes?${params.toString()}`,
    );
  }

  async getNote(orderId: number, id: number): Promise<OrderNote> {
    return await this.axiosService.get<OrderNote>(
      `/orders/${orderId}/notes/${id}`,
    );
  }

  async createNote(
    orderId: number,
    dto: CreateOrderNoteDto,
  ): Promise<OrderNote> {
    return await this.axiosService.post<OrderNote>(
      `/orders/${orderId}/notes`,
      dto,
    );
  }

  async deleteNote(orderId: number, id: number): Promise<OrderNote> {
    return await this.axiosService.delete<OrderNote>(
      `/orders/${orderId}/notes/${id}?force=true`,
    );
  }
}
