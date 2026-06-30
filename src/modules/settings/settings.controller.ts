import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Setting, SettingGroup } from './@types/setting.interface';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { UpdateSettingsBatchDto } from './dto/update-settings-batch.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getAllGroups(): Promise<SettingGroup[]> {
    return this.settingsService.getAllGroups();
  }

  @Get(':groupId')
  getGroupSettings(@Param('groupId') groupId: string): Promise<Setting[]> {
    return this.settingsService.getGroupSettings(groupId);
  }

  @Get(':groupId/:id')
  getSetting(
    @Param('groupId') groupId: string,
    @Param('id') id: string,
  ): Promise<Setting> {
    return this.settingsService.getSetting(groupId, id);
  }

  @Put(':groupId/:id')
  updateSetting(
    @Param('groupId') groupId: string,
    @Param('id') id: string,
    @Body() dto: UpdateSettingDto,
  ): Promise<Setting> {
    return this.settingsService.updateSetting(groupId, id, dto);
  }

  @Post(':groupId/batch')
  batchUpdateSettings(
    @Param('groupId') groupId: string,
    @Body() dto: UpdateSettingsBatchDto,
  ): Promise<Setting[]> {
    return this.settingsService.batchUpdateSettings(groupId, dto);
  }
}
