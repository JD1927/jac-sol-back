import { Test, TestingModule } from '@nestjs/testing';
import { HealthcareTypeService } from './healthcare-type.service';

describe('GenderService', () => {
  let service: HealthcareTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthcareTypeService],
    }).compile();

    service = module.get<HealthcareTypeService>(HealthcareTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
