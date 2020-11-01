import { IsString } from 'class-validator';

export class ProfessionDto {
  @IsString()
  name: string;
}