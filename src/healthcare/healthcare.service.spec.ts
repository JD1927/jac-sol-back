import { Test, TestingModule } from '@nestjs/testing';
import { HealthcareService } from './healthcare.service';

describe('CommitteeService', () => {
  let service: HealthcareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthcareService],
    }).compile();

    service = module.get<HealthcareService>(HealthcareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
