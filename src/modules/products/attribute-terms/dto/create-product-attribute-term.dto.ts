import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductAttributeTermDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  menu_order?: number;
}
