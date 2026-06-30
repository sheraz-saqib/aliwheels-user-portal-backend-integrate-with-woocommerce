import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { GetQueryDto } from '../../../../utils/common/dto/get-query.dto';

export class GetProductQueryDto extends GetQueryDto {
  @IsOptional()
  @IsIn(['draft', 'pending', 'private', 'publish', 'any'])
  status?: string;

  @IsOptional()
  @IsIn(['simple', 'grouped', 'external', 'variable'])
  type?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  category?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tag?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  shipping_class?: number;

  @IsOptional()
  @Type(() => Boolean)
  featured?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  on_sale?: boolean;

  @IsOptional()
  @IsString()
  min_price?: string;

  @IsOptional()
  @IsString()
  max_price?: string;

  @IsOptional()
  @IsIn(['instock', 'outofstock', 'onbackorder'])
  stock_status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  parent?: number;

  @IsOptional()
  @IsIn([
    'date',
    'id',
    'include',
    'title',
    'slug',
    'price',
    'popularity',
    'rating',
  ])
  orderby?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string;
}
