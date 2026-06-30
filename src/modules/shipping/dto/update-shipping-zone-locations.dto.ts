import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class ZoneLocationDto {
  @IsString()
  code!: string;

  @IsString()
  type!: string;
}

export class UpdateShippingZoneLocationsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ZoneLocationDto)
  locations!: ZoneLocationDto[];
}
