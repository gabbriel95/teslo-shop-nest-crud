import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  lastName: string;

  @Column('int')
  age: number;

  @Column('text', {
    unique: true,
  })
  dni: string;

  @Column('text', { default: 'Desempleado' })
  job: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column('boolean', { default: true })
  isActive: boolean;
}
