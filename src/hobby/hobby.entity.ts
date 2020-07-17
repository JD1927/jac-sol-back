import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Person } from 'src/person/person.entity';
import { PersonHobby } from 'src/person/person_hobby/person_hobby.entity';

@Entity()
export class Hobby extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PersonHobby, personHobby => personHobby.person, { cascade: true })
  personConnection: Person[];
}
