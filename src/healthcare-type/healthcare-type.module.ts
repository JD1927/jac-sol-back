import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthcareTypeController } from './healthcare-type.controller';
import { HealthcareTypeRepository } from './healthcare-type.repository';
import { HealthcareTypeService } from './healthcare-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthcareTypeRepository])],
  controllers: [HealthcareTypeController],
  providers: [HealthcareTypeService],
})
export class HealthcareTypeModule { }
