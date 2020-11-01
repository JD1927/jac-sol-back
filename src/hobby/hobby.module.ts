import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HobbyController } from './hobby.controller';
import { HobbyRepository } from './hobby.repository';
import { HobbyService } from './hobby.service';

@Module({
  imports: [TypeOrmModule.forFeature([HobbyRepository])],
  controllers: [HobbyController],
  providers: [HobbyService],
})
export class HobbyModule { }
