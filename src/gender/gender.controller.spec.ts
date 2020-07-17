import { Test, TestingModule } from '@nestjs/testing';
import { GenderController } from './gender.controller';

describe('Gender Controller', () => {
  let controller: GenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderController],
    }).compile();

    controller = module.get<GenderController>(GenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
