import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Profession } from './profession.entity';
import { ProfessionDto } from './dto/profession.dto';
import { PersonProfessionDto } from 'src/person/person_profession/person_profession.dto';

@EntityRepository(Profession)
export class ProfessionRepository extends Repository<Profession> {

  private logger = new Logger('ProfessionRepository');

  async createProfession(professionDto: ProfessionDto): Promise<Profession> {
    try {
      const { name } = professionDto;
      const profession = new Profession();
      profession.name = name;
      await profession.save();
      this.logger.verbose(`Hobby with name: ${name} was created succesfully`);
      return profession;
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getProfessionList(): Promise<Profession[]> {
    try {
      const result = await this.find();
      this.logger.verbose(`Getting Profession list succesfully`);
      return [ ...result ];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getProfessionById(id: number): Promise<Profession> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      this.notFoundException(id);
    }

    this.logger.verbose(`Getting Profession with ID: ${id} succesfully`);
    return found;
  }

  async deleteProfessionById(id: number): Promise<void> {
    await this.createQueryBuilder().delete().from(PersonProfessionDto).where(`professionId = :id`, { id }).execute();
    const result = await this.delete({ id });
    if (result.affected === 0) {
      this.notFoundException(id);
    }
  }

  async updateProfessionById(id: number, professionDto: ProfessionDto): Promise<Profession> {
    const { name } = professionDto;
    const profession = await this.getProfessionById(id);
    profession.name = name;
    this.logger.verbose(`Updating Profession with ID: ${id} succesfully`);
    await profession.save();
    return profession;

  }

  private notFoundException(id: number, ): void {
    this.logger.error(`Profession with ID: '${id}' not found.`);
    throw new NotFoundException(`Profession with ID: '${id}' not found.`);
  }

}
