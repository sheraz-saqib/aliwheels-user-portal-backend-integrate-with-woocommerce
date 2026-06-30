import { IsIn, IsOptional, IsString } from 'class-validator';
import { GetQueryDto } from '../../../utils/common/dto/get-query.dto';

export class GetCouponQueryDto extends GetQueryDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string;

  @IsOptional()
  @IsIn(['date', 'id', 'include', 'title', 'slug'])
  orderby?: string;
}
