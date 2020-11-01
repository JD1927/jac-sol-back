import { Controller, Get } from '@nestjs/common';
import { GenderService } from './gender.service';
import { Gender } from './gender.entity';

@Controller('api/gender')
export class GenderController {

  constructor(private genderService: GenderService) { }

  @Get()
  getGenderList(): Promise<Gender[]> {
    return this.genderService.getGenderList();
  }
}
