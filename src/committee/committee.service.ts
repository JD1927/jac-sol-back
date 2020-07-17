import { Injectable } from '@nestjs/common';
import { CommitteeRepository } from './committee.repository';
import { Committee } from './committee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommitteeDto } from './dto/committee.dto';

@Injectable()
export class CommitteeService {

  constructor(
    @InjectRepository(CommitteeRepository)
    public committeeRepository: CommitteeRepository,
  ) { }

  async createCommittee(committeeDto: CommitteeDto): Promise<Committee> {
    return this.committeeRepository.createCommittee(committeeDto);
  }

  async getCommitteeList(): Promise<Committee[]> {
    return this.committeeRepository.getCommitteeList();
  }

  async getCommitteeById(id: number): Promise<Committee> {
    return this.committeeRepository.getCommitteeById(id);
  }

  async deleteCommitteeById(id: number): Promise<void> {
    return this.committeeRepository.deleteCommitteeById(id);
  }

  async updateCommitteeById(id: number, committeeDto: CommitteeDto): Promise<Committee> {
    return this.committeeRepository.updateCommitteeById(id, committeeDto);
  }
}
