import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { GetQueryDto } from '../../../../utils/common/dto/get-query.dto';

export class GetOrderQueryDto extends GetQueryDto {
  @IsOptional()
  @IsIn([
    'any',
    'pending',
    'processing',
    'on-hold',
    'completed',
    'cancelled',
    'refunded',
    'failed',
    'trash',
  ])
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  customer?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  product?: number;

  @IsOptional()
  @IsString()
  after?: string;

  @IsOptional()
  @IsString()
  before?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string;

  @IsOptional()
  @IsIn(['date', 'id', 'include', 'title', 'slug'])
  orderby?: string;
}
