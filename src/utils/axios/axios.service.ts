import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, Method } from 'axios';
import { firstValueFrom } from 'rxjs';
import { GetResponseInterface } from '../response/get-response.interface';
import { catchHandler } from './catchHandler';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  post<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('POST', endpoint, data, config);
  }

  put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  patch<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, config);
  }

  delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }

  async paginate<T>(
    endpoint: string,
    page = 1,
    perPage = 10,
    config?: AxiosRequestConfig,
  ): Promise<GetResponseInterface<T>> {
    try {
      const response = await firstValueFrom(
        this.httpService.request<T[]>({
          method: 'GET',
          url: endpoint,
          ...config,
        }),
      );

      const total = Number(response.headers['x-wp-total'] ?? 0);
      const totalPages = Number(response.headers['x-wp-totalpages'] ?? 0);

      return {
        data: response.data,
        pagination: {
          total,
          totalPages,
          page,
          perPage,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error : any) {
      throw catchHandler(error);
    }
  }

  private async request<T>(
    method: Method,
    endpoint: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const { data: response } = await firstValueFrom(
        this.httpService.request<T>({
          method,
          url: endpoint,
          data,
          ...config,
        }),
      );

      return response;
    } catch (error: any) {
      throw catchHandler(error);
    }
  }
}
