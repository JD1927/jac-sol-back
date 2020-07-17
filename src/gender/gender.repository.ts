import { EntityRepository, Repository } from 'typeorm';
import { Gender } from './gender.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Gender)
export class GenderRepository extends Repository<Gender> {

  private logger = new Logger('GenderRepository');

  async getGenderList(): Promise<Gender[]> {
    try {
      const result = await this.find();
      return [...result];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }

  }

}
