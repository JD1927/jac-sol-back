import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthcareController } from './healthcare.controller';
import { HealthcareRepository } from './healthcare.repository';
import { HealthcareService } from './healthcare.service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthcareRepository])],
  controllers: [HealthcareController],
  providers: [HealthcareService],
})
export class HealthcareModule { }
