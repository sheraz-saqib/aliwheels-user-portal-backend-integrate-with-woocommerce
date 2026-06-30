import { IsIn, IsOptional } from 'class-validator';
import { GetQueryDto } from '../../../../utils/common/dto/get-query.dto';

export class GetProductVariationQueryDto extends GetQueryDto {
  @IsOptional()
  @IsIn(['draft', 'pending', 'private', 'publish', 'any'])
  status?: string;

  @IsOptional()
  @IsIn(['instock', 'outofstock', 'onbackorder'])
  stock_status?: string;
}
