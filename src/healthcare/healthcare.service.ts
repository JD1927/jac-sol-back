import { Injectable } from '@nestjs/common';
import { HealthcareRepository } from './healthcare.repository';
import { Healthcare } from './healthcare.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthcareDto } from './dto/healthcare.dto';

@Injectable()
export class HealthcareService {

  constructor(
    @InjectRepository(HealthcareRepository)
    public healthcareRepository: HealthcareRepository,
  ) { }

  async createHealthcare(healthcareDto: HealthcareDto): Promise<Healthcare> {
    return this.healthcareRepository.createHealthcare(healthcareDto);
  }

  async getHealthcareList(): Promise<Healthcare[]> {
    return this.healthcareRepository.getHealthcareList();
  }

  async getHealthcareById(id: number): Promise<Healthcare> {
    return this.healthcareRepository.getHealthcareById(id);
  }

  async deleteHealthcareById(id: number): Promise<void> {
    return this.healthcareRepository.deleteHealthcareById(id);
  }

  async updateHealthcareById(id: number, healthcareDto: HealthcareDto): Promise<Healthcare> {
    return this.healthcareRepository.updateHealthcareById(id, healthcareDto);
  }
}
