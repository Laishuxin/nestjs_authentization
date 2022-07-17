import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(_user: { email: string; password: string }) {
    const user = await this.usersRepository.create({
      email: _user.email,
      password: _user.password,
    });
    await user.save();
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string | number): Promise<User> {
    return this.usersRepository.findOneBy({ id: +id });
  }
}
