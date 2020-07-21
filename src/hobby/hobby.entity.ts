import { PersonHobby } from 'src/person/person_hobby/person_hobby.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hobby extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PersonHobby, personHobby => personHobby.person, { cascade: true })
  personConnection: PersonHobby[];
}
