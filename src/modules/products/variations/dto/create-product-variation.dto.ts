import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class VariationAttributeDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  option?: string;
}

class DimensionsDto {
  @IsOptional()
  @IsString()
  length?: string;

  @IsOptional()
  @IsString()
  width?: string;

  @IsOptional()
  @IsString()
  height?: string;
}

export class CreateProductVariationDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  regular_price?: string;

  @IsOptional()
  @IsString()
  sale_price?: string;

  @IsOptional()
  @IsIn(['draft', 'pending', 'private', 'publish'])
  status?: string;

  @IsOptional()
  @IsBoolean()
  virtual?: boolean;

  @IsOptional()
  @IsBoolean()
  downloadable?: boolean;

  @IsOptional()
  @IsBoolean()
  manage_stock?: boolean;

  @IsOptional()
  @IsNumber()
  stock_quantity?: number;

  @IsOptional()
  @IsIn(['instock', 'outofstock', 'onbackorder'])
  stock_status?: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions?: DimensionsDto;

  @IsOptional()
  @IsString()
  shipping_class?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariationAttributeDto)
  attributes?: VariationAttributeDto[];

  @IsOptional()
  @IsNumber()
  menu_order?: number;
}
