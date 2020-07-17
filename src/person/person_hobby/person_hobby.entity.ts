import { IsNumber } from 'class-validator';
import { Hobby } from 'src/hobby/hobby.entity';
import { Person } from 'src/person/person.entity';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class PersonHobby extends BaseEntity {

  @PrimaryColumn({ type: 'int'})
  @IsNumber()
  hobbyId: number;

  @PrimaryColumn({ type: 'int'})
  @IsNumber()
  personId: number;

  @ManyToOne(() => Person, person => person.hobbyConnection, { primary: true })
  @JoinColumn({ name: 'hobbyId' })
  hobby: Hobby;
  
  @ManyToOne(() => Hobby, hobby => hobby.personConnection, { primary: true })
  @JoinColumn({ name: 'personId' })
  person: Person;
}
