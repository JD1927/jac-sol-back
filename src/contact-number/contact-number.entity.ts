import { Person } from 'src/person/person.entity';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactNumber extends BaseEntity {
  @ManyToOne(() => Person, person => person.contactNumber)
  @JoinColumn({ name: 'personId' })
  person: Person;

  @PrimaryGeneratedColumn()
  personId: number;

  @PrimaryGeneratedColumn({ type: 'bigint' })
  contactNumber: string;

}
