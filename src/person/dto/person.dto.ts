import { IsDateString, IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class PersonDto {

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @MinLength(6)
  documentId: string;

  @IsString()
  name: string;

  @IsDateString()
  dateBirth: string;

  @IsNumber()
  age: number;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsNumber()
  documentTypeId: number;

  @IsNumber()
  roleId: number;

  @IsNumber()
  genderId: number;

  @IsNumber()
  healthcareTypeId: number;

  @IsNumber()
  healthcareId: number;

  @IsOptional()
  committeeId?: number;

  @IsNumber()
  academicLevelId: number;
  
  @IsOptional()
  relativeId?: number;

}