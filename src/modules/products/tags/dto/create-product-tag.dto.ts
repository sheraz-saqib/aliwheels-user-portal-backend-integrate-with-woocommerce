import { IsOptional, IsString } from 'class-validator';

export class CreateProductTagDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
