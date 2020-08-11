import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicLevelModule } from './academic-level/academic-level.module';
import { CommitteeModule } from './committee/committee.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ContactNumberModule } from './contact-number/contact-number.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { GenderModule } from './gender/gender.module';
import { HealthcareTypeModule } from './healthcare-type/healthcare-type.module';
import { HealthcareModule } from './healthcare/healthcare.module';
import { HobbyModule } from './hobby/hobby.module';
import { PersonModule } from './person/person.module';
import { ProfessionModule } from './profession/profession.module';
import { RoleModule } from './role/role.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
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
  ]
})
export class AppModule { }