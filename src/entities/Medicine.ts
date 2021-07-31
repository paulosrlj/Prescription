import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('medicines')
export default class Medicine {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @Column()
  readonly id: string;

  @PrimaryColumn()
  readonly idRegister: string;

  @PrimaryColumn()
  nome: string;

  @Column()
  categoria: string;

  @Column()
  classe_terapeutica: string;

  @Column()
  empresa_detentora: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
