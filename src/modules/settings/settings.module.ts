import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [AxiosModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
