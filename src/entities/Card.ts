import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import Patient from './Patient';
import Recipe from './Recipe';

@Entity('cards')
export default class Card {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn()
  readonly id: string;

  @Column({ nullable: false, default: 0 })
  quantidade_receitas: number;

  @OneToOne(() => Patient, patient => patient.cpf)
  patient: Patient;

  @OneToMany(type => Recipe, card => Card)
  recipes: Recipe[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
