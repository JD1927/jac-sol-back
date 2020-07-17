import { EntityRepository, Repository } from 'typeorm';
import { DocumentType } from './document-type.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(DocumentType)
export class DocumentTypeRepository extends Repository<DocumentType> {

  private logger = new Logger('DocumentTypeRepository');

  async getDocumentTypeList(): Promise<DocumentType[]> {
    try {
      const result = await this.find();
      return [...result];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }

  }

}
