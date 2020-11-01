import { EntityRepository, Repository } from 'typeorm';
import { HealthcareType } from './healthcare-type.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(HealthcareType)
export class HealthcareTypeRepository extends Repository<HealthcareType> {

  private logger = new Logger('HealthcareTypeRepository');

  async getHealthcareTypeList(): Promise<HealthcareType[]> {
    try {
      const result = await this.find();
      this.logger.log('Getting Healthcare Type List');
      return [...result];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }

  }

}
