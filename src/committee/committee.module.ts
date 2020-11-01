import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommitteeController } from './committee.controller';
import { CommitteeRepository } from './committee.repository';
import { CommitteeService } from './committee.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommitteeRepository])],
  controllers: [CommitteeController],
  providers: [CommitteeService],
})
export class CommitteeModule { }
