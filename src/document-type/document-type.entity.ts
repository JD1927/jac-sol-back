import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Person } from 'src/person/person.entity';

@Entity()
export class DocumentType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Person, person => person.documentType)
  person: Person[];
  
}
