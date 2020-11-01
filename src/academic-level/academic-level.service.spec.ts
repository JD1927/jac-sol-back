import { Test, TestingModule } from '@nestjs/testing';
import { AcademicLevelService } from './academic-level.service';

describe('AcademicLevelService', () => {
  let service: AcademicLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicLevelService],
    }).compile();

    service = module.get<AcademicLevelService>(AcademicLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
