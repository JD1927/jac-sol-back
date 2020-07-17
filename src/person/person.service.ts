import { Injectable } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { Person } from './person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonDto } from './dto/person.dto';
import { PersonHobbyDto } from './person_hobby/person_hobby.dto';
import { PersonHobby } from './person_hobby/person_hobby.entity';

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
}
