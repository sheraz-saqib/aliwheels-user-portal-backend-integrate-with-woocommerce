import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateOrderNoteDto {
  @IsString()
  note!: string;

  @IsOptional()
  @IsBoolean()
  customer_note?: boolean;

  @IsOptional()
  @IsBoolean()
  added_by_user?: boolean;
}
