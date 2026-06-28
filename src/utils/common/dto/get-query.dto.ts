import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  per_page: number = 10;

  @IsOptional()
  @IsString()
  search?: string = '';

  @IsOptional()
  @IsIn([
    'all',
    'administrator',
    'editor',
    'author',
    'contributor',
    'subscriber',
    'wpseo_manager',
    'wpseo_editor',
    'customer',
    'shop_manager',
  ])
  role?: string = 'all';
}
