import { IsIn, IsOptional } from 'class-validator';
import { GetQueryDto } from '../../../utils/common/dto/get-query.dto';

export class GetTaxRateQueryDto extends GetQueryDto {
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string;

  @IsOptional()
  @IsIn(['id', 'order'])
  orderby?: string;
}
