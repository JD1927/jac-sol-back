import { Controller, Get } from '@nestjs/common';
import { HealthcareTypeService } from './healthcare-type.service';
import { HealthcareType } from './healthcare-type.entity';

@Controller('api/healthcare/type')
export class HealthcareTypeController {

  constructor(private healthcareTypeService: HealthcareTypeService) { }

  @Get()
  getHealthcareTypeList(): Promise<HealthcareType[]> {
    return this.healthcareTypeService.getHealthcareTypeList();
  }
}
