import { Injectable } from '@nestjs/common';
import { ContactNumberRepository } from './contact-number.repository';
import { ContactNumber } from './contact-number.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactNumberDto } from './dto/contact-number.dto';

@Injectable()
export class ContactNumberService {

  constructor(
    @InjectRepository(ContactNumberRepository)
    public contactNumberRepository: ContactNumberRepository,
  ) { }

  async createContactNumber(contactNumberDto: ContactNumberDto): Promise<ContactNumber> {
    return this.contactNumberRepository.createContactNumber(contactNumberDto);
  }

  async getContactNumberListById(id: number): Promise<ContactNumber[]> {
    return this.contactNumberRepository.getContactNumberListById(id);
  }

  async getContactNumberById(contactNumberDto: ContactNumberDto): Promise<ContactNumber> {
    return this.contactNumberRepository.getContactNumberById(contactNumberDto);
  }

  async deleteContactNumberById(contactNumberDto: ContactNumberDto): Promise<void> {
    return this.contactNumberRepository.deleteContactNumberById(contactNumberDto);
  }

  async updateContactNumberById(contactNumberDto: ContactNumberDto): Promise<ContactNumber> {
    return this.contactNumberRepository.updateContactNumberById(contactNumberDto);
  }
}
