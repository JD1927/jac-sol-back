import { Injectable } from '@nestjs/common';
import { HobbyRepository } from './hobby.repository';
import { Hobby } from './hobby.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HobbyDto } from './dto/hobby.dto';

@Injectable()
export class HobbyService {

  constructor(
    @InjectRepository(HobbyRepository)
    public hobbyRepository: HobbyRepository,
  ) { }

  async createHobby(hobbyDto: HobbyDto): Promise<Hobby> {
    return this.hobbyRepository.createHobby(hobbyDto);
  }

  async getHobbyList(): Promise<Hobby[]> {
    return this.hobbyRepository.getHobbyList();
  }

  async getHobbyById(id: number): Promise<Hobby> {
    return this.hobbyRepository.getHobbyById(id);
  }

  async deleteHobbyById(id: number): Promise<void> {
    return this.hobbyRepository.deleteHobbyById(id);
  }

  async updateHobbyById(id: number, hobbyDto: HobbyDto): Promise<Hobby> {
    return this.hobbyRepository.updateHobbyById(id, hobbyDto);
  }
}
