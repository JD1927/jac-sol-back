import { Hobby } from 'src/hobby/hobby.entity';
import { Person } from 'src/person/person.entity';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class PersonHobby extends BaseEntity {

  @PrimaryColumn()
  hobbyId: number;

  @PrimaryColumn()
  personId: number;

  @ManyToOne(() => Person, person => person.hobbyConnection, { primary: true })
  @JoinColumn({ name: 'personId' })
  person: Person;
  
  @ManyToOne(() => Hobby, hobby => hobby.personConnection, { primary: true })
  @JoinColumn({ name: 'hobbyId' })
  hobby: Hobby;
}

export interface PersonHobbyList {
  hobbyId: number;
  personId: number;
  hobbyName: string;
}
