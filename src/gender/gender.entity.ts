import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Person } from 'src/person/person.entity';

@Entity()
export class Gender extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Person, person => person.gender)
  person: Person[];
}
