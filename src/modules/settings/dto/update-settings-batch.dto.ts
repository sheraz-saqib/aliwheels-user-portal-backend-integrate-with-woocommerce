import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class SettingUpdateDto {
  @IsString()
  id!: string;

  value!: any;
}

export class UpdateSettingsBatchDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SettingUpdateDto)
  update!: SettingUpdateDto[];
}
