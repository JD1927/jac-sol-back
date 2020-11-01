import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionController } from './profession.controller';
import { ProfessionRepository } from './profession.repository';
import { ProfessionService } from './profession.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionRepository])],
  controllers: [ProfessionController],
  providers: [ProfessionService],
})
export class ProfessionModule { }
