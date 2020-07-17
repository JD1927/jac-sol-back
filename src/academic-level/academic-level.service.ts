import { Injectable } from '@nestjs/common';
import { AcademicLevelRepository } from './academic-level.repository';
import { AcademicLevel } from './academic-level.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AcademicLevelService {

  constructor(
    @InjectRepository(AcademicLevelRepository)
    public academicLevelRepository: AcademicLevelRepository,
  ) { }

  async getAcademicLevelList(): Promise<AcademicLevel[]> {
    return this.academicLevelRepository.getAcademicLevelList();
  }
}
