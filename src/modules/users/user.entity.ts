import { hash } from 'src/utils';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
    this.password = await hash(password);
  }
}

// User.prototype.
