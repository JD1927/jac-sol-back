import { IsNumber } from 'class-validator';
import { Person } from 'src/person/person.entity';
import { Profession } from 'src/profession/profession.entity';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class PersonProfession extends BaseEntity {

  @PrimaryColumn()
  @IsNumber()
  professionId: number;

  @PrimaryColumn()
  @IsNumber()
  personId: number;

  @ManyToOne(() => Person, person => person.professionConnection, { primary: true })
  @JoinColumn({ name: 'professionId' })
  profession: Profession;
  
  @ManyToOne(() => Profession, profession => profession.personConnection, { primary: true })
  @JoinColumn({ name: 'personId' })
  person: Person;
}
