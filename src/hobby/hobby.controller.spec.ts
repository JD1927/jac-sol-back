import { Test, TestingModule } from '@nestjs/testing';
import { HobbyController } from './hobby.controller';

describe('Hobby Controller', () => {
  let controller: HobbyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HobbyController],
    }).compile();

    controller = module.get<HobbyController>(HobbyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
