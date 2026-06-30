import { IsIn, IsOptional } from 'class-validator';
import { GetQueryDto } from '../../../utils/common/dto/get-query.dto';

export class GetWebhookQueryDto extends GetQueryDto {
  @IsOptional()
  @IsIn(['all', 'active', 'paused', 'disabled'])
  status?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string;

  @IsOptional()
  @IsIn(['date', 'id', 'include', 'title'])
  orderby?: string;
}
