import { IsMongoId, IsString } from 'class-validator';

export class CreateThreadDto {
  @IsMongoId()
  participantId: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}
