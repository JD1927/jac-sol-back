import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Hobby } from './hobby.entity';
import { HobbyDto } from './dto/hobby.dto';
import { PersonHobby } from 'src/person/person_hobby/person_hobby.entity';

@EntityRepository(Hobby)
export class HobbyRepository extends Repository<Hobby> {

  private logger = new Logger('HobbyRepository');

  async createHobby(hobbyDto: HobbyDto): Promise<Hobby> {
    try {
      const { name } = hobbyDto;
      const hobby = new Hobby();
      hobby.name = name;
      await hobby.save();
      this.logger.verbose(`Hobby with name: ${name} was created succesfully`);
      return hobby;
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getHobbyList(): Promise<Hobby[]> {
    try {
      const result = await this.find();
      this.logger.verbose(`Getting Hobby list succesfully`);
      return [ ...result ];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getHobbyById(id: number): Promise<Hobby> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      this.notFoundException(id);
    }

    this.logger.verbose(`Getting Hobby with ID: ${id} succesfully`);
    return found;
  }

  async deleteHobbyById(id: number): Promise<void> {
    await this.createQueryBuilder().delete().from(PersonHobby).where(`hobbyId = :id`, { id }).execute();
    const result = await this.delete({ id });
    if (result.affected === 0) {
      this.notFoundException(id);
    }
  }

  async updateHobbyById(id: number, hobbyDto: HobbyDto): Promise<Hobby> {
    const { name } = hobbyDto;
    const hobby = await this.getHobbyById(id);
    hobby.name = name;
    this.logger.verbose(`Updating Hobby with ID: ${id} succesfully`);
    await hobby.save();
    return hobby;

  }

  private notFoundException(id: number, ): void {
    this.logger.error(`Hobby with ID: '${id}' not found.`);
    throw new NotFoundException(`Hobby with ID: '${id}' not found.`);
  }

}
