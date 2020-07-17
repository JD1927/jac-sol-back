import { Controller, Get, Post, Body, Param, Delete, Patch, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { HealthcareService as HealthcareService } from './healthcare.service';
import { Healthcare as Healthcare } from './healthcare.entity';
import { HealthcareDto } from './dto/healthcare.dto';

@Controller('api/healthcare')
export class HealthcareController {

  constructor(private healthcareService: HealthcareService) { }

  @Post()
  createHealthcare(@Body(ValidationPipe) healthcareDto: HealthcareDto): Promise<Healthcare> {
    return this.healthcareService.createHealthcare(healthcareDto);
  }

  @Get()
  getHealthcareList(): Promise<Healthcare[]> {
    return this.healthcareService.getHealthcareList();
  }

  @Get(':id')
  getHealthcareById(@Param('id', new ParseIntPipe()) id: number): Promise<Healthcare> {
    return this.healthcareService.getHealthcareById(id);
  }

  @Delete(':id')
  deleteHealthcareById(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.healthcareService.deleteHealthcareById(id);
  }

  @Patch(':id')
  updateHealthcareById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(ValidationPipe) healthcareDto: HealthcareDto): Promise<Healthcare> {
    return this.healthcareService.updateHealthcareById(id, healthcareDto);
  }
}
