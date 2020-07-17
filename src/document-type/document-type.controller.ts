import { Controller, Get } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { DocumentType } from './document-type.entity';

@Controller('api/document/type')
export class DocumentTypeController {

  constructor(private documentTypeService: DocumentTypeService) { }

  @Get()
  getGenderList(): Promise<DocumentType[]> {
    return this.documentTypeService.getDocumentTypeList();
  }
}
