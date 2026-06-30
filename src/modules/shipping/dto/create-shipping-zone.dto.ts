import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateShippingZoneDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
