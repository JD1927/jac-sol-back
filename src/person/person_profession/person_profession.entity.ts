import { Person } from 'src/person/person.entity';
import { Profession } from 'src/profession/profession.entity';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class PersonProfession extends BaseEntity {

  @PrimaryColumn()
  professionId: number;

  @PrimaryColumn()
  personId: number;

  @ManyToOne(() => Person, person => person.professionConnection, { primary: true })
  @JoinColumn({ name: 'personId' })
  person: Person;
  
  @ManyToOne(() => Profession, profession => profession.personConnection, { primary: true })
  @JoinColumn({ name: 'professionId' })
  profession: Profession;
}

export interface PersonProfessionList {
  personId: number;
  professionId: number;
  professionName: string;
}

