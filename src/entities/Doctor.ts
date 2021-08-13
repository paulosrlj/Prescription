import { hash } from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Recipe from './Recipe';

@Entity('doctors')
export default class Doctor {
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
  crm: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false, type: 'date' })
  birth_date: Date;

  @OneToMany(() => Recipe, recipes => recipes.doctor, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
  recipes: Recipe[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
