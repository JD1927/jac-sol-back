import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PersonDto } from './dto/person.dto';
import { Person } from './person.entity';
import { ContactNumber } from 'src/contact-number/contact-number.entity';
import { PersonHobbyDto } from './person_hobby/person_hobby.dto';
import { PersonHobby } from './person_hobby/person_hobby.entity';
import { PersonProfession } from './person_profession/person_profession.entity';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {

  private logger = new Logger('PersonRepository');

  async createPerson(personDto: PersonDto): Promise<Person> {
    let person = new Person();
    person = this.setPersonData(person, personDto);
    try {
      await person.save();
      this.logger.verbose(`Person with document ID '${personDto.documentId}' was created succesfully`);
      return person;
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getPersonList(): Promise<Person[]> {
    try {
      const result = await this.find(
        {
          relations: [
            'documentType', 'role', 'gender',
            'healthcareType', 'healthcare',
            'committee', 'academicLevel'
          ]
        }
      );
      this.logger.verbose(`Getting Person list succesfully`);
      return [...result];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getPersonById(id: number): Promise<Person> {
    const found = await this.findOne({
      where: { id },
      relations: [
        'documentType', 'role', 'gender', 'healthcareType', 'healthcare',
        'committee', 'academicLevel', 'hobbyConnection', 'professionConnection', 'relative', 'contactNumber'
      ]
    });

    if (!found) {
      this.notFoundException(id);
    }

    this.logger.verbose(`Getting Person with ID: ${id} succesfully`);
    return found;
  }

  async deletePersonById(id: number): Promise<void> {
    await this.createQueryBuilder().delete().from(PersonHobby).where(`personId = :id`, { id }).execute();
    await this.createQueryBuilder().delete().from(PersonProfession).where(`personId = :id`, { id }).execute();
    await this.createQueryBuilder().delete().from(ContactNumber).where(`personId = :id`, { id }).execute();

    const result = await this.delete({ id });
    if (result.affected === 0) {
      this.notFoundException(id);
    }
  }

  async updatePersonById(id: number, personDto: PersonDto): Promise<Person> {
    let person = await this.getPersonByIdWithoutRelations(id);
    person = this.setPersonData(person, personDto);
    this.logger.verbose(`Updating Person with ID: ${id} succesfully`);
    await person.save();
    return person;
  }

  async addPersonHobby(personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    const { personId, hobbyId } = personHobbyDto;
    const personHobby = new PersonHobby();
    personHobby.personId = personId;
    personHobby.hobbyId = hobbyId;

    try {
      await personHobby.save();
      this.logger.verbose(`Person Hobby with ID '${personHobbyDto.personId}':'${personHobbyDto.hobbyId}' was created succesfully`);
      return personHobby;
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getPersonHobbyById(personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    const { personId: id, hobbyId: hobby } = personHobbyDto;
    const query = this.createQueryBuilder().select('person_hobby').from(PersonHobby, 'person_hobby').where(`personId = :id`, { id }).andWhere('hobbyId = :hobby', { hobby });
    const found: PersonHobby = await query.getOne();

    if (!found) {
      this.logger.error(`PersonHobby with ID: '${id}':'${hobby}' not found.`);
    throw new NotFoundException(`PersonHobby with ID: '${id}':'${hobby}' not found.`);
    }

    this.logger.verbose(`Getting PersonHobby with ID: ${id}:${hobby} succesfully`);
    return found;
  }

  async deletePersonHobbyById(personHobbyDto: PersonHobbyDto): Promise<void> {
    const { personId: id, hobbyId } = personHobbyDto;
    const result = await this.createQueryBuilder().delete().from(PersonHobby).where(`personId = :id`, { id }).andWhere(`hobbyId = :hobbyId`, { hobbyId }).execute();

    if (result.affected === 0) {
      this.notFoundException(id);
    }
  }

  async updatePersonHobbyById(personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    const { personId, newHobbyId } = personHobbyDto;
    const personHobby = await this.getPersonHobbyById(personHobbyDto);
    await this.deletePersonHobbyById(personHobbyDto);
    personHobby.hobbyId = newHobbyId;
    personHobby.personId = personId;
    this.logger.verbose(`Updating PersonHobby with ID: ${personId}:${newHobbyId} succesfully`);
    await personHobby.save();
    return personHobby;
  }

  private async getPersonByIdWithoutRelations(id: number): Promise<Person> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      this.notFoundException(id);
    }

    this.logger.verbose(`Getting Person with ID: ${id} succesfully`);
    return found;
  }

  private notFoundException(id: number): void {
    this.logger.error(`Person with ID: '${id}' not found.`);
    throw new NotFoundException(`Person with ID: '${id}' not found.`);
  }

  private setPersonData(person: Person, personDto: PersonDto): Person {

    person.documentId = personDto.documentId;
    person.name = personDto.name;
    person.dateBirth = personDto.dateBirth;
    person.age = personDto.age;
    person.address = personDto.address;
    person.email = personDto.email;
    person.documentTypeId = personDto.documentTypeId;
    person.roleId = personDto.roleId;
    person.genderId = personDto.genderId;
    person.healthcareTypeId = personDto.healthcareTypeId;
    person.healthcareId = personDto.healthcareId;
    person.committeeId = personDto.committeeId;
    person.academicLevelId = personDto.academicLevelId;
    person.relativeId = personDto.relativeId;

    return person;
  }

}
