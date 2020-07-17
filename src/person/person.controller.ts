import { Controller, Get, Post, Body, Param, Delete, Patch, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.entity';
import { PersonDto } from './dto/person.dto';
import { PersonHobbyDto } from './person_hobby/person_hobby.dto';
import { PersonHobby } from './person_hobby/person_hobby.entity';

@Controller('api/person')
export class PersonController {

  constructor(private personService: PersonService) { }

  @Post()
  createPerson(@Body(new ValidationPipe()) personDto: PersonDto): Promise<Person> {
    return this.personService.createPerson(personDto);
  }

  @Get()
  getPersonList(): Promise<Person[]> {
    return this.personService.getPersonList();
  }

  @Get(':id')
  getPersonById(@Param('id', new ParseIntPipe()) id: number): Promise<Person> {
    return this.personService.getPersonById(id);
  }

  @Delete(':id')
  deletePersonById(@Param('id', new ParseIntPipe(), new ParseIntPipe()) id: number): Promise<void> {
    return this.personService.deletePersonById(id);
  }

  @Patch(':id')
  updatePersonById(
    @Param('id', new ParseIntPipe(), new ParseIntPipe()) id: number,
    @Body(new ValidationPipe()) personDto: PersonDto): Promise<Person> {
    return this.personService.updatePersonById(id, personDto);
  }

  @Post('/hobby')
  addPersonHobby(@Body(new ValidationPipe()) personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    return this.personService.addPersonHobby(personHobbyDto);
  }

  @Get('/hobby/:personId/:hobbyId')
  getPersonHobby(
    @Param('personId', new ParseIntPipe()) personId: number,
    @Param('hobbyId', new ParseIntPipe()) hobbyId: number,
  ): Promise<PersonHobby> {
    console.log(typeof(personId));
    return this.personService.getPersonHobbyById({ personId, hobbyId });
  }

  @Delete('/hobby/:personId/:hobbyId')
  deletePersonHobbyById(
    @Param('personId', new ParseIntPipe()) personId: number,
    @Param('hobbyId', new ParseIntPipe()) hobbyId: number,): Promise<void> {
    return this.personService.deletePersonHobbyById({ personId, hobbyId });
  }

  @Patch('/hobby/:id')
  updatePersonHobbyById(
    @Param('id', new ParseIntPipe()) personId: number,
    @Body(new ValidationPipe()) personHobbyDto: PersonHobbyDto
    ): Promise<PersonHobby> {
    return this.personService.updatePersonHobbyById({ ...personHobbyDto, personId });
  }
  
}
