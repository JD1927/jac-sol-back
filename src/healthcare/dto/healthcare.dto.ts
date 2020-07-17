import { IsString } from 'class-validator';

export class HealthcareDto {
  @IsString()
  name: string;
}