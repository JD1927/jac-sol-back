import { Person } from 'src/person/person.entity';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class ContactNumber extends BaseEntity {
  @ManyToOne(() => Person, person => person.contactNumber)
  @JoinColumn({ name: 'personId' })
  person: Person;

  @PrimaryColumn()
  personId: number;

  @PrimaryColumn({ type: 'bigint' })
  contactNumber: string;

}
