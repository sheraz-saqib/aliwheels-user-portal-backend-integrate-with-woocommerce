import { IsOptional, IsString } from 'class-validator';

export class CreateProductShippingClassDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
