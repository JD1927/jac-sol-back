import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,
  UploadedFile, UseInterceptors, ValidationPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PersonDto } from './dto/person.dto';
import { Person } from './person.entity';
import { PersonService } from './person.service';
import { PersonHobbyDto } from './person_hobby/person_hobby.dto';
import { PersonHobby, PersonHobbyList } from './person_hobby/person_hobby.entity';
import { PersonProfessionDto } from './person_profession/person_profession.dto';
import { PersonProfession, PersonProfessionList } from './person_profession/person_profession.entity';

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

  @Get('/hobby/list/:personId')
  getPersonHobbyListById(@Param('personId', new ParseIntPipe()) personId: number): Promise<PersonHobbyList[]> {
    return this.personService.getPersonHobbyListById(personId);
  }

  @Post('/hobby')
  addPersonHobby(@Body(new ValidationPipe()) personHobbyDto: PersonHobbyDto): Promise<PersonHobby> {
    return this.personService.addPersonHobby(personHobbyDto);
  }

  @Get('/hobby/:personId/:hobbyId')
  getPersonHobby(
    @Param('personId', new ParseIntPipe()) personId: number,
    @Param('hobbyId', new ParseIntPipe()) hobbyId: number
  ): Promise<PersonHobby> {
    console.log(typeof (personId));
    return this.personService.getPersonHobbyById({ personId, hobbyId });
  }

  @Delete('/hobby/:personId/:hobbyId')
  deletePersonHobbyById(
    @Param('personId', new ParseIntPipe()) personId: number,
    @Param('hobbyId', new ParseIntPipe()) hobbyId: number): Promise<void> {
    return this.personService.deletePersonHobbyById({ personId, hobbyId });
  }

  @Patch('/hobby/:id')
  updatePersonHobbyById(
    @Param('id', new ParseIntPipe()) personId: number,
    @Body(new ValidationPipe()) personHobbyDto: PersonHobbyDto
  ): Promise<PersonHobby> {
    return this.personService.updatePersonHobbyById({ ...personHobbyDto, personId });
  }

  @Get('/profession/list/:personId')
  getPersonProfessionListById(@Param('personId', new ParseIntPipe()) personId: number): Promise<PersonProfessionList[]> {
    return this.personService.getPersonProfessionListById(personId);
  }

  @Post('/profession')
  addPersonProfession(@Body(new ValidationPipe()) personProfessionDto: PersonProfessionDto): Promise<PersonProfession> {
    return this.personService.addPersonProfession(personProfessionDto);
  }

  @Get('/profession/:personId/:professionId')
  getPersonProfession(
    @Param('personId', new ParseIntPipe()) personId: number,
    @Param('professionId', new ParseIntPipe()) professionId: number,
  ): Promise<PersonProfession> {
    console.log(typeof (personId));
    return this.personService.getPersonProfessionById({ personId, professionId });
  }

  @Delete('/profession/:personId/:professionId')
  deletePersonProfessionById(
    @Param('personId', new ParseIntPipe()) personId: number,
    @Param('ProfessionId', new ParseIntPipe()) professionId: number): Promise<void> {
    return this.personService.deletePersonProfessionById({ personId, professionId });
  }

  @Patch('/profession/:id')
  updatePersonProfessionById(
    @Param('id', new ParseIntPipe()) personId: number,
    @Body(new ValidationPipe()) personProfessionDto: PersonProfessionDto
  ): Promise<PersonProfession> {
    return this.personService.updatePersonProfessionById({ ...personProfessionDto, personId });
  }

  @Post('/document/file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: any,
    @Body() document: any
  ) {
    console.log(file);
    console.log(document);
    return { ...file };
  }

}
