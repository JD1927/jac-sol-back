import { Test, TestingModule } from '@nestjs/testing';
import { ContactNumberController } from './contact-number.controller';

describe('Committee Controller', () => {
  let controller: ContactNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactNumberController],
    }).compile();

    controller = module.get<ContactNumberController>(ContactNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
