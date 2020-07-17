import { Test, TestingModule } from '@nestjs/testing';
import { AcademicLevelController } from './academic-level.controller';

describe('AcademicLevel Controller', () => {
  let controller: AcademicLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicLevelController],
    }).compile();

    controller = module.get<AcademicLevelController>(AcademicLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
