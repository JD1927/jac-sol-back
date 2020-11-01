import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Person } from './../person/person.entity';

@Entity()
export class DocumentType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nameCode: string;

  @OneToMany(() => Person, person => person.documentType)
  person: Person[];
  
}
