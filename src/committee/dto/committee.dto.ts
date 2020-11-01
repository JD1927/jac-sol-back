import { IsString } from 'class-validator';

export class CommitteeDto {
  @IsString()
  name: string;
}