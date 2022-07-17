import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { hash, genSalt } from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    password = password || this.password;
    this.password = await hash(password, await genSalt(10));
  }
}

// User.prototype.
