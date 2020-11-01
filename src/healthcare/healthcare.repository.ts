import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Healthcare } from './healthcare.entity';
import { HealthcareDto } from './dto/healthcare.dto';

@EntityRepository(Healthcare)
export class HealthcareRepository extends Repository<Healthcare> {

  private logger = new Logger('HealthcareRepository');

  async createHealthcare(healthcareDto: HealthcareDto): Promise<Healthcare> {
    try {
      const { name } = healthcareDto;
      const healthcare = new Healthcare();
      healthcare.name = name;
      await healthcare.save();
      this.logger.verbose(`Healthcare with name: ${name} was created succesfully`);
      return healthcare;
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getHealthcareList(): Promise<Healthcare[]> {
    try {
      const result = await this.find();
      this.logger.verbose(`Getting Healthcare list succesfully`);
      return [...result];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getHealthcareById(id: number): Promise<Healthcare> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      this.notFoundException(id);
    }

    this.logger.verbose(`Getting Healthcare with ID: ${id} succesfully`);
    return found;
  }

  async deleteHealthcareById(id: number): Promise<void> {
    const result = await this.delete({ id });
    if (result.affected === 0) {
      this.notFoundException(id);
    }
  }

  async updateHealthcareById(id: number, healthcareDto: HealthcareDto): Promise<Healthcare> {
    const { name } = healthcareDto;
    const healthcare = await this.getHealthcareById(id);
    healthcare.name = name;
    this.logger.verbose(`Updating Healthcare with ID: ${id} succesfully`);
    await healthcare.save();
    return healthcare;

  }

  private notFoundException(id: number, ): void {
    this.logger.error(`Healthcare with ID: '${id}' not found.`);
    throw new NotFoundException(`Healthcare with ID: '${id}' not found.`);
  }

}
