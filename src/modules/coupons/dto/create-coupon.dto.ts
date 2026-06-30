import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  code!: string;

  @IsOptional()
  @IsString()
  amount?: string;

  @IsOptional()
  @IsIn(['percent', 'fixed_cart', 'fixed_product'])
  discount_type?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  date_expires?: string;

  @IsOptional()
  @IsBoolean()
  individual_use?: boolean;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  product_ids?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  excluded_product_ids?: number[];

  @IsOptional()
  @IsNumber()
  usage_limit?: number;

  @IsOptional()
  @IsNumber()
  usage_limit_per_user?: number;

  @IsOptional()
  @IsNumber()
  limit_usage_to_x_items?: number;

  @IsOptional()
  @IsBoolean()
  free_shipping?: boolean;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  product_categories?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  excluded_product_categories?: number[];

  @IsOptional()
  @IsBoolean()
  exclude_sale_items?: boolean;

  @IsOptional()
  @IsString()
  minimum_amount?: string;

  @IsOptional()
  @IsString()
  maximum_amount?: string;

  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  email_restrictions?: string[];
}
