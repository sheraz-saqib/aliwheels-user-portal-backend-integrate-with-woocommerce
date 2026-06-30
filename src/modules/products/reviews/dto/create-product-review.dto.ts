import { IsEmail, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductReviewDto {
  @IsNumber()
  product_id!: number;

  @IsString()
  review!: string;

  @IsString()
  reviewer!: string;

  @IsEmail()
  reviewer_email!: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsIn(['approved', 'hold', 'spam', 'unspam', 'trash', 'untrash'])
  status?: string;
}
