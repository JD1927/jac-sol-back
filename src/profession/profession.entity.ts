import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { PersonProfession } from './../person/person_profession/person_profession.entity';
import { Person } from './../person/person.entity';

@Entity()
export class Profession extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PersonProfession, personHobby => personHobby.person, { cascade: true })
  personConnection: Person[];
}
