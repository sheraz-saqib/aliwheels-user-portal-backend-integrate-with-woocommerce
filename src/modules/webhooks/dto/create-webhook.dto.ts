import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateWebhookDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn(['active', 'paused', 'disabled'])
  status?: string;

  @IsString()
  topic!: string;

  @IsUrl()
  delivery_url!: string;

  @IsOptional()
  @IsString()
  secret?: string;
}
