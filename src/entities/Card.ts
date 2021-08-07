import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import Patient from './Patient';

@Entity('cards')
export default class Card {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn()
  readonly id: string;

  @Column()
  quantidade_receitas: number;

  @OneToOne(() => Patient, patient => patient.cpf)
  patient: Patient;

  // @OneToMany(type => Recipe, card => Card)
  // recipes: Recipe[];
  // Acho que esse relacionamento deveria estar so nas receitas

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
