import { IsIn, IsOptional } from 'class-validator';

export class GetOrderNoteQueryDto {
  @IsOptional()
  @IsIn(['any', 'customer', 'internal'])
  type?: string;
}
