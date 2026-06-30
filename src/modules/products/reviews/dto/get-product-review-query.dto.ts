import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { GetQueryDto } from '../../../../utils/common/dto/get-query.dto';

export class GetProductReviewQueryDto extends GetQueryDto {
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  product?: number[];

  @IsOptional()
  @IsIn(['all', 'approved', 'hold', 'spam', 'trash'])
  status?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string;

  @IsOptional()
  @IsIn(['date', 'date_gmt', 'id', 'include', 'product'])
  orderby?: string;
}
