import { Module } from '@nestjs/common';
import { PersonModule } from './../person/person.module';
import { ExcelReportController } from './excel-report.controller';
import { ExcelReportService } from './excel-report.service';

@Module({
    imports: [PersonModule],
    controllers: [ExcelReportController],
    providers: [ExcelReportService],
})
export class SharedModule { }
