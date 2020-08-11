import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Excel from 'exceljs';
import { ContactNumber } from 'src/contact-number/contact-number.entity';
import { Person } from 'src/person/person.entity';
import { PersonRepository } from 'src/person/person.repository';

@Injectable()
export class ExcelReportService {
  constructor(
    @InjectRepository(PersonRepository)
    public personRepository: PersonRepository,
  ) { }

  async getAllMembersReport(): Promise<void> {
    const personList: Person[] = await this.personRepository.getPersonListReport(1);
    console.log(personList[0]);

    const workbook = new Excel.Workbook();
    workbook.created = new Date();
    workbook.creator = 'JAC Puerta del Sol';

    const worksheet = workbook.addWorksheet('Reporte de Afiliados');
    const header = this.createMemberHeaderRow();

    worksheet.columns = [ ...header ];

    personList.forEach((person) => {
      worksheet.addRow({
        ...person,
        documentType: person.documentType.nameCode,
        relative: person.relative ? person.relative.documentId : 'No tiene',
        gender: person.gender.nameCode,
        healthcare: person.healthcare.name,
        committee: person.committee.name,
        contactNumber: [ ...this.getContactNumbers(person.contactNumber) ],
        dateBirth: this.getFormatDate(person.dateBirth)
      })
    });

    const date = new Date();
    return await workbook.xlsx.writeFile(`./JAC-REPORTS/jac-psol-afiliados-${this.getFormatDate(date.toISOString())}.xlsx`);
  }

  createMemberHeaderRow(): Partial<Excel.Column>[] {
    return [
      {
        header: 'PersonId', key: 'id', width: 8,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Tipo', key: 'documentType', width: 5,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'N° Documento', key: 'documentId', width: 14,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Nombre Completo', key: 'name', width: 24,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Fecha Nacimiento', key: 'dateBirth', width: 18,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Edad', key: 'age', width: 5,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Género', key: 'gender', width: 8,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Dirección', key: 'address', width: 18,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'EPS - Sisbén', key: 'healthcare', width: 15,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Comité', key: 'committee', width: 15,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Familiar', key: 'relative', width: 18,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Número de contacto', key: 'contactNumber', width: 20,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      }

    ];
  }

  async getAllPeopleReport(): Promise<void> {
    const personList: Person[] = await this.personRepository.getPersonListReport();
    console.log(personList[0]);

    const workbook = new Excel.Workbook();
    workbook.created = new Date();
    workbook.creator = 'JAC Puerta del Sol';

    const worksheet = workbook.addWorksheet('Reporte de Personas');
    const header = this.createAllPeopleHeaderRow();

    worksheet.columns = [ ...header ];

    personList.forEach((person) => {
      worksheet.addRow({
        ...person,
        documentType: person.documentType.nameCode,
        relative: person.relative ? person.relative.documentId : 'No tiene',
        gender: person.gender.nameCode,
        healthcare: person.healthcare.name,
        contactNumber: [ ...this.getContactNumbers(person.contactNumber) ],
        dateBirth: this.getFormatDate(person.dateBirth)
      })
    });

    const date = new Date();
    return await workbook.xlsx.writeFile(`./JAC-REPORTS/jac-psol-comunidad-${this.getFormatDate(date.toISOString())}.xlsx`);
  }

  createAllPeopleHeaderRow(): Partial<Excel.Column>[] {
    return [
      {
        header: 'PersonId', key: 'id', width: 8,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Tipo', key: 'documentType', width: 5,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'N° Documento', key: 'documentId', width: 14,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Nombre Completo', key: 'name', width: 24,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Fecha Nacimiento', key: 'dateBirth', width: 18,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Edad', key: 'age', width: 5,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Género', key: 'gender', width: 8,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Dirección', key: 'address', width: 18,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'EPS - Sisbén', key: 'healthcare', width: 15,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Familiar', key: 'relative', width: 18,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      },
      {
        header: 'Número de contacto', key: 'contactNumber', width: 20,
        style: {
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: { size: 12, name: 'Arial', family: 2 }
        }
      }

    ];
  }

  getFormatDate(dateBirth: string): string {
    const date = new Date(dateBirth)
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }

  getContactNumbers(contactNumbers: ContactNumber[]): string[] {
    const result = []
    contactNumbers.forEach((number) => {
      result.push(number.contactNumber);
    });

    return result;
  } 
}
