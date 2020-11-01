import { Controller, Get, Post, Body, Param, Delete, Patch, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { Hobby } from './hobby.entity';
import { HobbyDto } from './dto/hobby.dto';

@Controller('api/hobby')
export class HobbyController {

  constructor(private hobbyService: HobbyService) { }

  @Post()
  createHobby(@Body(ValidationPipe) hobbyDto: HobbyDto): Promise<Hobby> {
    return this.hobbyService.createHobby(hobbyDto);
  }

  @Get()
  getHobbyList(): Promise<Hobby[]> {
    return this.hobbyService.getHobbyList();
  }

  @Get(':id')
  getHobbyById(@Param('id', new ParseIntPipe()) id: number): Promise<Hobby> {
    return this.hobbyService.getHobbyById(id);
  }

  @Delete(':id')
  deleteHobbyById(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.hobbyService.deleteHobbyById(id);
  }

  @Patch(':id')
  updateHobbyById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(ValidationPipe) hobbyDto: HobbyDto): Promise<Hobby> {
    return this.hobbyService.updateHobbyById(id, hobbyDto);
  }
}
