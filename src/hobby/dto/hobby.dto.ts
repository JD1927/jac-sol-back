import { IsString } from 'class-validator';

export class HobbyDto {
  @IsString()
  name: string;
}