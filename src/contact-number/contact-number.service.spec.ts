import { Test, TestingModule } from '@nestjs/testing';
import { ContactNumberService } from './contact-number.service';

describe('CommitteeService', () => {
  let service: ContactNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactNumberService],
    }).compile();

    service = module.get<ContactNumberService>(ContactNumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
