import { EntityRepository, Repository } from 'typeorm';
import { AcademicLevel } from './academic-level.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(AcademicLevel)
export class AcademicLevelRepository extends Repository<AcademicLevel> {

  private logger = new Logger('AcademicLevelRepository');

  async getAcademicLevelList(): Promise<AcademicLevel[]> {
    try {
      const result = await this.find();
      this.logger.log('Getting Academic Level List');
      return [...result];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }

  }

}
