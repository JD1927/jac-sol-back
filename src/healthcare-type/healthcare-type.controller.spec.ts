import { Test, TestingModule } from '@nestjs/testing';
import { HealthcareTypeController } from './healthcare-type.controller';

describe('HealthcareType Controller', () => {
  let controller: HealthcareTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcareTypeController],
    }).compile();

    controller = module.get<HealthcareTypeController>(HealthcareTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
