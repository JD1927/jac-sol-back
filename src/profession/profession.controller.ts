import { Controller, Get, Post, Body, Param, Delete, Patch, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { Profession } from './profession.entity';
import { ProfessionDto } from './dto/profession.dto';

@Controller('api/profession')
export class ProfessionController {

  constructor(private professionService: ProfessionService) { }

  @Post()
  createProfession(@Body(ValidationPipe) professionDto: ProfessionDto): Promise<Profession> {
    return this.professionService.createProfession(professionDto);
  }

  @Get()
  getProfessionList(): Promise<Profession[]> {
    return this.professionService.getProfessionList();
  }

  @Get(':id')
  getProfessionById(@Param('id', new ParseIntPipe()) id: number): Promise<Profession> {
    return this.professionService.getProfessionById(id);
  }

  @Delete(':id')
  deleteProfessionById(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.professionService.deleteProfessionById(id);
  }

  @Patch(':id')
  updateProfessionById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(ValidationPipe) professionDto: ProfessionDto): Promise<Profession> {
    return this.professionService.updateProfessionById(id, professionDto);
  }
}
