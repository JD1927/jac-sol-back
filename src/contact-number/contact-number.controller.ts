import { Controller, Get, Post, Body, Param, Delete, Patch, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ContactNumberService } from './contact-number.service';
import { ContactNumber } from './contact-number.entity';
import { ContactNumberDto } from './dto/contact-number.dto';

@Controller('api/contact/number')
export class ContactNumberController {

  constructor(private contactNumberService: ContactNumberService) { }

  @Post()
  createContactNumber(@Body(ValidationPipe) contactNumberDto: ContactNumberDto): Promise<ContactNumber> {
    return this.contactNumberService.createContactNumber(contactNumberDto);
  }

  @Get(':id')
  getContactNumberList(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<ContactNumber[]> {
    return this.contactNumberService.getContactNumberListById(id);
  }

  @Get(':id/:number')
  getContactNumberById(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('number') number: string
  ): Promise<ContactNumber> {
    return this.contactNumberService.getContactNumberById({ personId: id, contactNumber: number });
  }

  @Delete(':id/:number')
  deleteContactNumberById(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('number') number: string
  ): Promise<void> {
    return this.contactNumberService.deleteContactNumberById({ personId: id, contactNumber: number });
  }

  @Patch(':id')
  updateContactNumberById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(ValidationPipe) contactNumberDto: ContactNumberDto): Promise<ContactNumber> {
    return this.contactNumberService.updateContactNumberById({ ...contactNumberDto, personId: id});
  }
}
