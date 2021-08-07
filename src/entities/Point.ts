import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('point')
export default class Point {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @Column()
  readonly id: string;

  @PrimaryColumn()
  lat: string;

  @Column()
  lng: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
