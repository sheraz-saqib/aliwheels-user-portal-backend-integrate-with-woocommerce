import { IsString } from 'class-validator';

export class CreateTaxClassDto {
  @IsString()
  name!: string;
}
