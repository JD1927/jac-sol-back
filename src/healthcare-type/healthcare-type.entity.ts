import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Person } from 'src/person/person.entity';

@Entity()
export class HealthcareType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Person, person => person.healthcareType)
  person: Person[];
}
