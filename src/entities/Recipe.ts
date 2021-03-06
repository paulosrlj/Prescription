import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Card from './Card';
import Doctor from './Doctor';
import Image from './Image';
import Medicine from './Medicine';

@Entity('recipes')
export default class Recipe {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn()
  readonly id: string;

  @Column({ nullable: false })
  illness_name: string;

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
  @JoinColumn({ name: 'doctor_crm', referencedColumnName: 'crm' })
  doctor: Doctor;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relacionamento many to many
  // @ManyToMany(type => Medicine)
  // @JoinTable({
  //   name: 'recipe_medicine',
  //   joinColumn: {
  //     name: 'recipeId',
  //   },
  //   inverseJoinColumn: {
  //     name: 'medicineIdRegister',
  //   },
  // })
  // medicines: Medicine[];

  @OneToMany(() => Image, image => image.recipe, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
  images: Image[];
}
