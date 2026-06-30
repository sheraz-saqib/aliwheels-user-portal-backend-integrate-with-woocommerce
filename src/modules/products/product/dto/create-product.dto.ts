import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ImageDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  src?: string;

  @IsOptional()
  @IsString()
  alt?: string;
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

class CategoryRefDto {
  @IsNumber()
  id!: number;
}

class TagRefDto {
  @IsNumber()
  id!: number;
}

class AttributeRefDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  position?: number;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @IsOptional()
  @IsBoolean()
  variation?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];
}

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsIn(['simple', 'grouped', 'external', 'variable'])
  type?: string;

  @IsOptional()
  @IsIn(['draft', 'pending', 'private', 'publish'])
  status?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  short_description?: string;

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
  @IsBoolean()
  virtual?: boolean;

  @IsOptional()
  @IsBoolean()
  downloadable?: boolean;

  @IsOptional()
  @IsString()
  tax_status?: string;

  @IsOptional()
  @IsString()
  tax_class?: string;

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
  @IsBoolean()
  reviews_allowed?: boolean;

  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryRefDto)
  categories?: CategoryRefDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagRefDto)
  tags?: TagRefDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeRefDto)
  attributes?: AttributeRefDto[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  related_ids?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  upsell_ids?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  cross_sell_ids?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  grouped_products?: number[];

  @IsOptional()
  @IsNumber()
  menu_order?: number;
}
