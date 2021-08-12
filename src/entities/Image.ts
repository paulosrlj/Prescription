import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Recipe from './Recipe';

@Entity('image')
export default class Image {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn()
  readonly id: string;

  @Column()
  path: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Recipe, recipe => recipe.imagesPath, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  recipe: Recipe;
}
