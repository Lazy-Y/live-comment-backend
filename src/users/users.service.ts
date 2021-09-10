import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async genCreateUser(userName: string): Promise<User> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ userName }])
      .returning('*')
      .execute();
    return result.generatedMaps[0] as User;
  }
}
