import { EntityRepository, Repository } from 'typeorm';
import { Role } from './role.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

  private logger = new Logger('RoleRepository');

  async getRoleList(): Promise<Role[]> {
    try {
      const result = await this.find();
      this.logger.log('Getting Role List');
      return [...result];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }

  }

}
