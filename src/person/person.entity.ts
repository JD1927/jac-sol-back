import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AcademicLevel } from './../academic-level/academic-level.entity';
import { Committee } from './../committee/committee.entity';
import { ContactNumber } from './../contact-number/contact-number.entity';
import { DocumentType } from './../document-type/document-type.entity';
import { Gender } from './../gender/gender.entity';
import { HealthcareType } from './../healthcare-type/healthcare-type.entity';
import { Healthcare } from './../healthcare/healthcare.entity';
import { PersonHobby } from './../person/person_hobby/person_hobby.entity';
import { Role } from './../role/role.entity';
import { PersonProfession } from './person_profession/person_profession.entity';

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentId: string;

  @Column()
  name: string;

  @Column()
  dateBirth: string;

  @Column({ nullable: true })
  age?: number;

  @Column()
  address: string;

  @Column()
  email: string;

  // DOCUMENT TYPE
  @ManyToOne(() => DocumentType, documentType => documentType.person, { eager: false, cascade: true })
  @JoinColumn()
  documentType: DocumentType;

  @Column()
  documentTypeId: number;

  // ROLE
  @ManyToOne(() => Role, role => role.person, { eager: false, cascade: true })
  @JoinColumn()
  role: Role

  @Column()
  roleId: number

  // GENDER
  @ManyToOne(() => Gender, gender => gender.person, { eager: false, cascade: true })
  @JoinColumn()
  gender: Gender

  @Column()
  genderId: number;

  // HEALTHCARE TYPE
  @ManyToOne(() => HealthcareType, healthcareType => healthcareType.person, { eager: false, cascade: true })
  @JoinColumn()
  healthcareType: HealthcareType;

  @Column()
  healthcareTypeId: number;

  // HEALTHCARE
  @ManyToOne(() => Healthcare, healthcare => healthcare.person, { eager: false, cascade: true })
  @JoinColumn()
  healthcare: Healthcare;

  @Column()
  healthcareId: number;

  // COMMITTEE
  @ManyToOne(() => Committee, committee => committee.person, { eager: false, cascade: true })
  @JoinColumn()
  committee?: Committee;

  @Column({ nullable: true })
  committeeId?: number;

  // ACADEMIC LEVEL
  @ManyToOne(() => AcademicLevel, academicLevel => academicLevel.person, { eager: false, cascade: true })
  @JoinColumn()
  academicLevel: AcademicLevel;

  @Column()
  academicLevelId: number;

  // HOBBY
  @OneToMany(() => PersonHobby, personHobby => personHobby.person)
  hobbyConnection: PersonHobby[];

  // PROFESSION
  @OneToMany(() => PersonProfession, personProfession => personProfession.profession, { eager: false })
  professionConnection: PersonProfession[];

  // CONTACT NUMBER
  @OneToMany(() => ContactNumber, contactNumber => contactNumber.person, { eager: false, cascade: true })
  contactNumber: ContactNumber[];

  // RELATIVE
  @Column({ nullable: true })
  relativeId?: number;

  @ManyToOne(() => Person, person => person.id)
  @JoinColumn({ name: "relativeId" })
  relative?: Person;
}
