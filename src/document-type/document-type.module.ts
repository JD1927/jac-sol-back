import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTypeController } from './document-type.controller';
import { DocumentTypeRepository } from './document-type.repository';
import { DocumentTypeService } from './document-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentTypeRepository])],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule { }
