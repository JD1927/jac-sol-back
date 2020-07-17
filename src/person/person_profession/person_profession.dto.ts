import { IsNumber } from 'class-validator';

export class PersonProfessionDto {

  @IsNumber()
  professionId: number;

  @IsNumber()
  personId: number;

}