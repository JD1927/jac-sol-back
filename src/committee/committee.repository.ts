import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Committee } from './committee.entity';
import { CommitteeDto } from './dto/committee.dto';

@EntityRepository(Committee)
export class CommitteeRepository extends Repository<Committee> {

  private logger = new Logger('CommitteeRepository');

  async createCommittee(committeeDto: CommitteeDto): Promise<Committee> {
    try {
      const { name } = committeeDto;
      const committee = new Committee();
      committee.name = name;
      await committee.save();
      this.logger.verbose(`Committee with name: ${name} was created succesfully`);
      return committee;
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getCommitteeList(): Promise<Committee[]> {
    try {
      const result = await this.find();
      this.logger.verbose(`Getting Committee list succesfully`);
      return [ ...result ];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getCommitteeById(id: number): Promise<Committee> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      this.notFoundException(id);
    }

    this.logger.verbose(`Getting Committee with ID: ${id} succesfully`);
    return found;
  }

  async deleteCommitteeById(id: number): Promise<void> {
    const result = await this.delete({ id });
    if (result.affected === 0) {
      this.notFoundException(id);
    }
  }

  async updateCommitteeById(id: number, committeeDto: CommitteeDto): Promise<Committee> {
    const { name } = committeeDto;
    const committee = await this.getCommitteeById(id);
    committee.name = name;
    this.logger.verbose(`Updating Committee with ID: ${id} succesfully`);
    await committee.save();
    return committee;

  }

  private notFoundException(id: number, ): void {
    this.logger.error(`Committee with ID: '${id}' not found.`);
    throw new NotFoundException(`Committee with ID: '${id}' not found.`);
  }

}
