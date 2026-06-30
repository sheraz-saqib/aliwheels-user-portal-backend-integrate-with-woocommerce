import { IsIn, IsOptional } from 'class-validator';
import { GetQueryDto } from '../../../../utils/common/dto/get-query.dto';

export class GetProductAttributeQueryDto extends GetQueryDto {
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string;

  @IsOptional()
  @IsIn(['id', 'name'])
  orderby?: string;
}
