import { IsNumber, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class ContactNumberDto {
  
  @IsOptional()
  @IsNumber()
  personId?: number;

  @IsString()
  @MinLength(7)
  @MaxLength(10)
  contactNumber: string;

  @IsOptional()
  @IsString()
  @MinLength(7)
  @MaxLength(10)
  newContactNumber?: string;

}