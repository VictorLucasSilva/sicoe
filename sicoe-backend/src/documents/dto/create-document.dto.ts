import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(180)
  name!: string;
}
