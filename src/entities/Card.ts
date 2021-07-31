import {
  Column,
  CreateDateColumn,
  Entity,
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

  @OneToOne(type => Patient, card => Card)
  patient: Patient;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
