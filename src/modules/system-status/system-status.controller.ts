import { Controller, Get, Param, Put } from '@nestjs/common';
import { SystemStatusService } from './system-status.service';
import {
  SystemStatus,
  SystemStatusTool,
} from './@types/system-status.interface';

@Controller('system_status')
export class SystemStatusController {
  constructor(private readonly systemStatusService: SystemStatusService) {}

  @Get()
  getSystemStatus(): Promise<SystemStatus> {
    return this.systemStatusService.getSystemStatus();
  }

  @Get('tools')
  getAllTools(): Promise<SystemStatusTool[]> {
    return this.systemStatusService.getAllTools();
  }

  @Get('tools/:id')
  getTool(@Param('id') id: string): Promise<SystemStatusTool> {
    return this.systemStatusService.getTool(id);
  }

  @Put('tools/:id')
  runTool(@Param('id') id: string): Promise<SystemStatusTool> {
    return this.systemStatusService.runTool(id);
  }
}
