import { Injectable } from '@nestjs/common';
import { DocumentTypeRepository } from './document-type.repository';
import { DocumentType } from './document-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DocumentTypeService {

  constructor(
    @InjectRepository(DocumentTypeRepository)
    public documentTypeRepository: DocumentTypeRepository,
  ) { }

  async getDocumentTypeList(): Promise<DocumentType[]> {
    return this.documentTypeRepository.getDocumentTypeList();
  }
}
