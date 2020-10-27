import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ContactNumber } from './contact-number.entity';
import { ContactNumberDto } from './dto/contact-number.dto';

@EntityRepository(ContactNumber)
export class ContactNumberRepository extends Repository<ContactNumber> {

  private logger = new Logger('ContactNumberRepository');

  async createContactNumber(contactNumberDto: ContactNumberDto): Promise<ContactNumber> {
    try {
      const { personId, contactNumber: number } = contactNumberDto;
      const contactNumber = new ContactNumber();
      contactNumber.personId = personId;
      contactNumber.contactNumber = number;
      await contactNumber.save();
      this.logger.verbose(`User with ID: ${personId} add contact number ${number} succesfully`);
      return contactNumber;
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getContactNumberListById(personId: number): Promise<ContactNumber[]> {
    try {
      const result = await this.find({ where: { personId } });
      this.logger.verbose(`Getting ContactNumber list by personId: '${personId}' succesfully`);
      return [...result];
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getContactNumberById(contactNumberDto: ContactNumberDto): Promise<ContactNumber> {
    const { personId, contactNumber } = contactNumberDto;
    const found = await this.findOne({ where: { personId, contactNumber } });

    if (!found) {
      this.notFoundException(personId);
    }

    this.logger.verbose(`Getting ContactNumber with ID: ${personId}:${contactNumber} succesfully`);
    return found;
  }

  async deleteContactNumberById(contactNumberDto: ContactNumberDto): Promise<void> {
    const { personId, contactNumber } = contactNumberDto;
    const result = await this.delete({ personId, contactNumber });
    if (result.affected === 0) {
      this.notFoundException(personId);
    }
  }

  async updateContactNumberById(contactNumberDto: ContactNumberDto): Promise<ContactNumber> {
    const { personId, newContactNumber } = contactNumberDto;
    const contactNumber = await this.getContactNumberById(contactNumberDto);
    await this.deleteContactNumberById(contactNumberDto);
    contactNumber.contactNumber = newContactNumber;
    contactNumber.personId = personId;
    this.logger.verbose(`Updating ContactNumber with ID: ${personId}:${newContactNumber} succesfully`);
    await contactNumber.save();
    return contactNumber;
  }

  private notFoundException(id: number): void {
    this.logger.error(`ContactNumber with ID: '${id}' not found.`);
    throw new NotFoundException(`ContactNumber with ID: '${id}' not found.`);
  }

}
