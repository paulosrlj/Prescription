import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { hash } from 'bcryptjs';

@Entity('admin')
export default class Admin {
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @BeforeInsert()
  async hashPassord(): Promise<void> {
    this.password = await hash(this.password, 8);
  }

  @PrimaryColumn()
  readonly id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
