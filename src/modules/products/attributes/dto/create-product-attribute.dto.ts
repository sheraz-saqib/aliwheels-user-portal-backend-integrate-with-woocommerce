import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateProductAttributeDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsIn(['select', 'text'])
  type?: string;

  @IsOptional()
  @IsIn(['menu_order', 'name', 'name_num', 'id'])
  order_by?: string;

  @IsOptional()
  @IsBoolean()
  has_archives?: boolean;
}
