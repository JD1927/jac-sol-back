import { IsNumber, IsOptional } from 'class-validator';

export class PersonProfessionDto {

  @IsOptional()
  @IsNumber()
  personId?: number;

  @IsNumber()
  professionId: number;

  @IsOptional()
  @IsNumber()
  newProfessionId?: number;

}