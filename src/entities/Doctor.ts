import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Recipe from './Recipe';

@Entity('doctors')
export default class Doctor {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @Column()
  readonly id: string;

  @PrimaryColumn()
  crm: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false, type: 'date' })
  birthDate: Date;

  @OneToMany(type => Recipe, doctor => Doctor)
  recipes: Recipe[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
