import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { hash } from 'bcryptjs';
import Card from './Card';

@Entity('patients')
export default class Patient {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @BeforeInsert()
  async hashPassord(): Promise<void> {
    this.password = await hash(this.password, 8);
  }

  @Column()
  readonly id: string;

  @PrimaryColumn()
  cpf: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false, type: 'date' })
  birth_date: Date;

  @OneToOne(() => Card, card => card.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  card: Card;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
