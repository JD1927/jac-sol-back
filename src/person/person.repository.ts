import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ContactNumber } from 'src/contact-number/contact-number.entity';
import { Hobby } from 'src/hobby/hobby.entity';
import { Profession } from 'src/profession/profession.entity';
import { EntityRepository, Repository } from 'typeorm';
import { PersonDto } from './dto/person.dto';
import { Person } from './person.entity';
import { PersonHobbyDto } from './person_hobby/person_hobby.dto';
import { PersonHobby, PersonHobbyList } from './person_hobby/person_hobby.entity';
import { PersonProfessionDto } from './person_profession/person_profession.dto';
import { PersonProfession, PersonProfessionList } from './person_profession/person_profession.entity';

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
            'committee', 'academicLevel', 'relative'  
          ],
          order: { id: 'ASC' }
        }
      );
      this.logger.verbose(`Getting Person list succesfully`);
      return [...result];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getPersonListReport(roleId?: number): Promise<Person[]> {
    try {
      let result = [];
      if (roleId) {
        result = await this.find(
          {
            relations: [
              'documentType', 'role', 'gender', 'healthcareType', 'healthcare',
              'committee', 'academicLevel', 'contactNumber', 'relative'
            ],
            where: { roleId },
            order: { id: 'ASC' }
          }
        );
      } else {
        result = await this.find(
          {
            relations: [
              'documentType', 'role', 'gender', 'healthcareType', 'healthcare',
              'academicLevel', 'contactNumber', 'relative'
            ],
            order: { id: 'ASC' }
          }
        );
      }
      this.logger.verbose(`Getting Person list for report succesfully`);
      return [ ...result ];
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
        'committee', 'academicLevel', 'contactNumber', 'relative'
      ],
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
    this.logger.verbose(`Deleting Person with ID: ${id} succesfully`);
  }

  async updatePersonById(id: number, personDto: PersonDto): Promise<Person> {
    let person = await this.getPersonByIdWithoutRelations(id);
    person = this.setPersonData(person, personDto);
    this.logger.verbose(`Updating Person with ID: ${id} succesfully`);
    await person.save();
    return person;
  }

  private async getPersonByIdWithoutRelations(id: number): Promise<Person> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      this.notFoundException(id);
    }

    this.logger.verbose(`Getting Person with ID: ${id} succesfully`);
    return found;
  }

  async getPersonHobbyListById(id: number): Promise<PersonHobbyList[]> {
    let hobbyList: PersonHobbyList[] = await this.createQueryBuilder()
      .from(PersonHobby, 'ph')
      .addSelect('person.id', 'personId')
      .addSelect('hobby.id', 'hobbyId')
      .addSelect('hobby.name', 'hobbyName')
      .innerJoin(Hobby, 'hobby', 'ph.hobbyId = hobby.id')
      .innerJoin(Person, 'person', 'person.id = ph.personId')
      .where(`ph.personId = :id`, { id })
      .getRawMany();

    console.table(hobbyList);

    hobbyList = hobbyList.map((hobby) => {
      return {
        personId: hobby.personId,
        hobbyId: hobby.hobbyId,
        hobbyName: hobby.hobbyName
      }
    });

    if (!hobbyList || hobbyList.length > 0) {
      this.logger.verbose(`Getting PersonHobbyList with personId: ${id} succesfully`);
    } else {
      this.logger.verbose(`PersonHobbyList with personId: '${id}' was not found.`);
    }
    return hobbyList; 
  }

  async addPersonHobby(personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    const { personId, hobbyId } = personHobbyDto;

    const personHobby = new PersonHobby();
    personHobby.hobbyId = hobbyId;
    personHobby.personId = personId;

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
    const query = this.createQueryBuilder()
      .select('person_hobby').from(PersonHobby, 'person_hobby')
      .where(`person_hobby.personId = :id`, { id })
      .andWhere('person_hobby.hobbyId = :hobby', { hobby });
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
    const result = await this.createQueryBuilder()
      .delete().from(PersonHobby)
      .where(`personId = :id`, { id }).andWhere(`hobbyId = :hobbyId`, { hobbyId }).execute();

    if (result.affected === 0) {
      this.notFoundException(id);
    }
  }

  async updatePersonHobbyById(personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    const { personId, newHobbyId } = personHobbyDto;
    const personHobby = await this.getPersonHobbyById(personHobbyDto);
    const { hobbyId } = personHobby;
    await this.deletePersonHobbyById({ personId, hobbyId });
    personHobby.personId = personId;
    personHobby.hobbyId = newHobbyId;

    this.logger.verbose(`Updating PersonHobby with ID: ${personId}:${newHobbyId} succesfully`);
    await personHobby.save();
    return personHobby;
  }

  async getPersonProfessionListById(id: number): Promise<PersonProfessionList[]> {
    let professionList: PersonProfessionList[] = await this.createQueryBuilder()
      .from(PersonProfession, 'pp')
      .addSelect('person.id', 'personId')
      .addSelect('profession.id', 'professionId')
      .addSelect('profession.name', 'professionName')
      .innerJoin(Profession, 'profession', 'pp.professionId = profession.id')
      .innerJoin(Person, 'person', 'person.id = pp.personId')
      .where(`pp.personId = :id`, { id })
      .getRawMany();

    professionList = professionList.map((profession) => {
      return {
        personId: profession.personId,
        professionId: profession.professionId,
        professionName: profession.professionName
      }
    });

    if (!professionList || professionList.length > 0) {
      this.logger.verbose(`Getting PersonProfessionList with personId: ${id} succesfully`);
    } else {
      this.logger.verbose(`PersonProfessionList with personId: '${id}' was not found.`);
    }
    return professionList; 
  }

  async addPersonProfession(personProfessionDto: PersonProfessionDto): Promise<PersonProfession> {
    const { personId, professionId } = personProfessionDto;
    const personProfession = new PersonProfession();
    personProfession.personId = personId;
    personProfession.professionId = professionId;

    try {
      await personProfession.save();
      this.logger.verbose(`Person Profession with ID '${personProfessionDto.personId}':'${personProfessionDto.professionId}' 
      was created succesfully`);
      return personProfession;
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getPersonProfessionById(personProfessionDto: PersonProfessionDto): Promise<PersonProfession> {
    const { personId: id, professionId: profession } = personProfessionDto;
    const query = this.createQueryBuilder()
      .select('person_profession').from(PersonProfession, 'person_profession')
      .where(`person_profession.personId = :id`, { id }).andWhere('person_profession.professionId = :profession', { profession });
    const found: PersonProfession = await query.getOne();

    if (!found) {
      this.logger.error(`PersonProfession with ID: '${id}':'${profession}' not found.`);
      throw new NotFoundException(`PersonProfession with ID: '${id}':'${profession}' not found.`);
    }

    this.logger.verbose(`Getting PersonProfession with ID: ${id}:${profession} succesfully`);
    return found;
  }

  async deletePersonProfessionById(personProfessionDto: PersonProfessionDto): Promise<void> {
    const { personId: id, professionId } = personProfessionDto;
    const result = await this.createQueryBuilder()
      .delete().from(PersonProfession)
      .where(`personId = :id`, { id })
      .andWhere(`professionId = :professionId`, { professionId }).execute();

    if (result.affected === 0) {
      this.notFoundException(id);
    }
  }

  async updatePersonProfessionById(personProfessionDto: PersonProfessionDto): Promise<PersonProfession> {
    const { personId, newProfessionId } = personProfessionDto;
    const personHobby = await this.getPersonProfessionById(personProfessionDto);
    await this.deletePersonProfessionById(personProfessionDto);
    personHobby.professionId = newProfessionId;
    personHobby.personId = personId;
    this.logger.verbose(`Updating PersonHobby with ID: ${personId}:${newProfessionId} succesfully`);
    await personHobby.save();
    return personHobby;
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
