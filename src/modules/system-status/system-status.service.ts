import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import {
  SystemStatus,
  SystemStatusTool,
} from './@types/system-status.interface';

@Injectable()
export class SystemStatusService {
  constructor(private readonly axiosService: AxiosService) {}

  async getSystemStatus(): Promise<SystemStatus> {
    return await this.axiosService.get<SystemStatus>('/system_status');
  }

  async getAllTools(): Promise<SystemStatusTool[]> {
    return await this.axiosService.get<SystemStatusTool[]>(
      '/system_status/tools',
    );
  }

  async getTool(id: string): Promise<SystemStatusTool> {
    return await this.axiosService.get<SystemStatusTool>(
      `/system_status/tools/${id}`,
    );
  }

  async runTool(id: string): Promise<SystemStatusTool> {
    return await this.axiosService.put<SystemStatusTool>(
      `/system_status/tools/${id}`,
      {},
    );
  }
}
