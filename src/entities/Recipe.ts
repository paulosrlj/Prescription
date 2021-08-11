import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Card from './Card';
import Doctor from './Doctor';
import Medicine from './Medicine';

@Entity('recipes')
export default class Recipe {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn()
  readonly id: string;

  @Column({ nullable: false, type: 'date' })
  validade: Date;

  @Column({ nullable: false })
  due: boolean;

  @ManyToOne(type => Card, recipes => Recipe, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  card: Card;

  @ManyToOne(type => Doctor, recipes => Recipe, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  doctor: Doctor;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relacionamento many to many
  @ManyToMany(type => Medicine)
  @JoinTable({
    name: 'recipe_medicine',
    joinColumn: {
      name: 'recipe_id',
    },
    inverseJoinColumn: {
      name: 'medicine_idRegister',
    },
  })
  medicines: Medicine[];
}
