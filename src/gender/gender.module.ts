import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderController } from './gender.controller';
import { GenderRepository } from './gender.repository';
import { GenderService } from './gender.service';

@Module({
  imports: [TypeOrmModule.forFeature([GenderRepository])],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule { }
