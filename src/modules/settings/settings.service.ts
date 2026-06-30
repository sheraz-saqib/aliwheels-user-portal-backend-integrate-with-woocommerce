import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { Setting, SettingGroup } from './@types/setting.interface';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { UpdateSettingsBatchDto } from './dto/update-settings-batch.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllGroups(): Promise<SettingGroup[]> {
    return await this.axiosService.get<SettingGroup[]>('/settings');
  }

  async getGroupSettings(groupId: string): Promise<Setting[]> {
    return await this.axiosService.get<Setting[]>(`/settings/${groupId}`);
  }

  async getSetting(groupId: string, id: string): Promise<Setting> {
    return await this.axiosService.get<Setting>(`/settings/${groupId}/${id}`);
  }

  async updateSetting(
    groupId: string,
    id: string,
    dto: UpdateSettingDto,
  ): Promise<Setting> {
    return await this.axiosService.put<Setting>(
      `/settings/${groupId}/${id}`,
      dto,
    );
  }

  async batchUpdateSettings(
    groupId: string,
    dto: UpdateSettingsBatchDto,
  ): Promise<Setting[]> {
    return await this.axiosService.post<Setting[]>(
      `/settings/${groupId}/batch`,
      dto,
    );
  }
}
