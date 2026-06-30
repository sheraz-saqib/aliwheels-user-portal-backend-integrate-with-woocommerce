import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaxRateDto {
  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  postcode?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  rate!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priority?: number;

  @IsOptional()
  @IsBoolean()
  compound?: boolean;

  @IsOptional()
  @IsBoolean()
  shipping?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  class?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  postcodes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cities?: string[];
}
