import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactNumberController } from './contact-number.controller';
import { ContactNumberRepository } from './contact-number.repository';
import { ContactNumberService } from './contact-number.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactNumberRepository])],
  controllers: [ContactNumberController],
  providers: [ContactNumberService],
})
export class ContactNumberModule { }
