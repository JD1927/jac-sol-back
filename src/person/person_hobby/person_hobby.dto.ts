import { IsNumber, IsOptional } from 'class-validator';

export class PersonHobbyDto {

  @IsOptional()
  @IsNumber()
  personId?: number;

  @IsNumber()
  hobbyId: number;

  @IsOptional()
  @IsNumber()
  newHobbyId?: number;

}