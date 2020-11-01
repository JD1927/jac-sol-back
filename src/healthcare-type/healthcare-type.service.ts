import { Injectable } from '@nestjs/common';
import { HealthcareTypeRepository } from './healthcare-type.repository';
import { HealthcareType } from './healthcare-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HealthcareTypeService {

  constructor(
    @InjectRepository(HealthcareTypeRepository)
    public healthcareTypeRepository: HealthcareTypeRepository,
  ) { }

  async getHealthcareTypeList(): Promise<HealthcareType[]> {
    return this.healthcareTypeRepository.getHealthcareTypeList();
  }
}
