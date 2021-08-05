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

import {
  IsDate,
  IsEmail,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

import Card from './Card';

@Entity('patients')
export default class Patient {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @Column()
  readonly id: string;

  @PrimaryColumn()
  cpf: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(1)
  @MaxLength(150)
  name: string;

  @Column()
  password: string;

  @Column()
  @IsPhoneNumber('BR')
  phone: string;

  @Column()
  @IsDate()
  birthDate: Date;

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
