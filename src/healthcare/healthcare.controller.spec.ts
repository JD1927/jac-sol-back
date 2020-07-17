import { Test, TestingModule } from '@nestjs/testing';
import { HealthcareController } from './healthcare.controller';

describe('Healthcare Controller', () => {
  let controller: HealthcareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcareController],
    }).compile();

    controller = module.get<HealthcareController>(HealthcareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
