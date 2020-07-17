import { Injectable } from '@nestjs/common';
import { ProfessionRepository } from './profession.repository';
import { Profession } from './profession.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionDto } from './dto/profession.dto';

@Injectable()
export class ProfessionService {

  constructor(
    @InjectRepository(ProfessionRepository)
    public professionRepository: ProfessionRepository,
  ) { }

  async createProfession(professionDto: ProfessionDto): Promise<Profession> {
    return this.professionRepository.createProfession(professionDto);
  }

  async getProfessionList(): Promise<Profession[]> {
    return this.professionRepository.getProfessionList();
  }

  async getProfessionById(id: number): Promise<Profession> {
    return this.professionRepository.getProfessionById(id);
  }

  async deleteProfessionById(id: number): Promise<void> {
    return this.professionRepository.deleteProfessionById(id);
  }

  async updateProfessionById(id: number, professionDto: ProfessionDto): Promise<Profession> {
    return this.professionRepository.updateProfessionById(id, professionDto);
  }
}
