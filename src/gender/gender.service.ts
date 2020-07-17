import { Injectable } from '@nestjs/common';
import { GenderRepository } from './gender.repository';
import { Gender } from './gender.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GenderService {

  constructor(
    @InjectRepository(GenderRepository)
    public genderRepository: GenderRepository,
  ) { }

  async getGenderList(): Promise<Gender[]> {
    return this.genderRepository.getGenderList();
  }
}
