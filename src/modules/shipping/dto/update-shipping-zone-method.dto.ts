import { IsBoolean, IsNumber, IsObject, IsOptional } from 'class-validator';

export class UpdateShippingZoneMethodDto {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsObject()
  settings?: Record<string, unknown>;
}
