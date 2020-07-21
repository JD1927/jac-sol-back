import { Injectable } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { Person } from './person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonDto } from './dto/person.dto';
import { PersonHobbyDto } from './person_hobby/person_hobby.dto';
import { PersonHobby, PersonHobbyList } from './person_hobby/person_hobby.entity';
import { PersonProfessionDto } from './person_profession/person_profession.dto';
import { PersonProfession, PersonProfessionList } from './person_profession/person_profession.entity';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(PersonRepository)
    public personRepository: PersonRepository,
  ) { }

  async createPerson(personDto: PersonDto): Promise<Person> {
    return this.personRepository.createPerson(personDto);
  }

  async getPersonList(): Promise<Person[]> {
    return this.personRepository.getPersonList();
  }

  async getPersonById(id: number): Promise<Person> {
    return this.personRepository.getPersonById(id);
  }

  async deletePersonById(id: number): Promise<void> {
    return this.personRepository.deletePersonById(id);
  }

  async updatePersonById(id: number, committeeDto: PersonDto): Promise<Person> {
    return this.personRepository.updatePersonById(id, committeeDto);
  }

  async getPersonHobbyListById(id: number): Promise<PersonHobbyList[]> {
    return this.personRepository.getPersonHobbyListById(id);
  }

  async addPersonHobby(personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    return this.personRepository.addPersonHobby(personHobbyDto);
  }

  async getPersonHobbyById(personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    return this.personRepository.getPersonHobbyById(personHobbyDto);
  }

  async deletePersonHobbyById(personHobbyDto: PersonHobbyDto): Promise<void> {
    return this.personRepository.deletePersonHobbyById(personHobbyDto);
  }

  async updatePersonHobbyById(personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    return this.personRepository.updatePersonHobbyById(personHobbyDto);
  }

  async getPersonProfessionListById(id: number): Promise<PersonProfessionList[]> {
    return this.personRepository.getPersonProfessionListById(id);
  }

  async addPersonProfession(personProfessionDto: PersonProfessionDto): Promise<PersonProfession> {
    return this.personRepository.addPersonProfession(personProfessionDto);
  }

  async getPersonProfessionById(personProfessionDto: PersonProfessionDto): Promise<PersonProfession> {
    return this.personRepository.getPersonProfessionById(personProfessionDto);
  }

  async deletePersonProfessionById(personProfessionDto: PersonProfessionDto): Promise<void> {
    return this.personRepository.deletePersonProfessionById(personProfessionDto);
  }

  async updatePersonProfessionById(personProfessionDto: PersonProfessionDto): Promise<PersonProfession> {
    return this.personRepository.updatePersonProfessionById(personProfessionDto);
  }


}
