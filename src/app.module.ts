import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicLevelModule } from './academic-level/academic-level.module';
import { CommitteeModule } from './committee/committee.module';
import { typeOrmConfig } from './config/typeorm.config';
import { DocumentTypeModule } from './document-type/document-type.module';
import { GenderModule } from './gender/gender.module';
import { HealthcareTypeModule } from './healthcare-type/healthcare-type.module';
import { HealthcareModule } from './healthcare/healthcare.module';
import { HobbyModule } from './hobby/hobby.module';
import { PersonModule } from './person/person.module';
import { ProfessionModule } from './profession/profession.module';
import { RoleModule } from './role/role.module';
import { ContactNumberModule } from './contact-number/contact-number.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AcademicLevelModule,
    GenderModule,
    CommitteeModule,
    HealthcareTypeModule,
    HealthcareModule,
    RoleModule,
    DocumentTypeModule,
    ProfessionModule,
    HobbyModule,
    PersonModule,
    ContactNumberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }