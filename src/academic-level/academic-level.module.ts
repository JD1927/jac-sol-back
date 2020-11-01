import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicLevelController } from './academic-level.controller';
import { AcademicLevelRepository } from './academic-level.repository';
import { AcademicLevelService } from './academic-level.service';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicLevelRepository])],
  controllers: [AcademicLevelController],
  providers: [AcademicLevelService],
})
export class AcademicLevelModule { }
