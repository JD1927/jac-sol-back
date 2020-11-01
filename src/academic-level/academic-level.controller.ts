import { Controller, Get } from '@nestjs/common';
import { AcademicLevelService } from './academic-level.service';
import { AcademicLevel } from './academic-level.entity';

@Controller('api/academic/level')
export class AcademicLevelController {

  constructor(private academicLevelService: AcademicLevelService) { }

  @Get()
  getAcademicLevelList(): Promise<AcademicLevel[]> {
    return this.academicLevelService.getAcademicLevelList();
  }
}
