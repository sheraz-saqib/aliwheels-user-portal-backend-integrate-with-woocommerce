import { IsIn, IsOptional, IsString } from 'class-validator';

export class GetTopSellersReportQueryDto {
  @IsOptional()
  @IsIn(['week', 'month', 'last_month', 'year'])
  period?: string;

  @IsOptional()
  @IsString()
  date_min?: string;

  @IsOptional()
  @IsString()
  date_max?: string;
}
