import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { GetQueryDto } from '../../../../utils/common/dto/get-query.dto';

export class GetProductCategoryQueryDto extends GetQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  parent?: number;

  @IsOptional()
  @IsIn(['any', 'product'])
  product?: number;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string;

  @IsOptional()
  @IsIn(['id', 'include', 'name', 'slug', 'count'])
  orderby?: string;
}
