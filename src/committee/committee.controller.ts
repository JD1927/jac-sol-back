import { Controller, Get, Post, Body, Param, Delete, Patch, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CommitteeService } from './committee.service';
import { Committee } from './committee.entity';
import { CommitteeDto } from './dto/committee.dto';

@Controller('api/committee')
export class CommitteeController {

  constructor(private committeeService: CommitteeService) { }

  @Post()
  createCommittee(@Body(ValidationPipe) committeeDto: CommitteeDto): Promise<Committee> {
    return this.committeeService.createCommittee(committeeDto);
  }

  @Get()
  getCommitteeList(): Promise<Committee[]> {
    return this.committeeService.getCommitteeList();
  }

  @Get(':id')
  getCommitteeById(@Param('id', new ParseIntPipe()) id: number): Promise<Committee> {
    return this.committeeService.getCommitteeById(id);
  }

  @Delete(':id')
  deleteCommitteeById(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.committeeService.deleteCommitteeById(id);
  }

  @Patch(':id')
  updateCommitteeById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(ValidationPipe) committeeDto: CommitteeDto): Promise<Committee> {
    return this.committeeService.updateCommitteeById(id, committeeDto);
  }
}
