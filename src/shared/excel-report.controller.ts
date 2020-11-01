import { Controller, Get } from '@nestjs/common';
import { ExcelReportService } from './excel-report.service';

@Controller('api/report')
export class ExcelReportController {

  constructor(private excelReport: ExcelReportService) { }

  @Get('/member')
  async getAllMembersReport(): Promise<void> {
    return await this.excelReport.getAllMembersReport();
  }

  @Get('/all')
  async getAllPeopleReport(): Promise<void> {
    return await this.excelReport.getAllPeopleReport();
  }

}