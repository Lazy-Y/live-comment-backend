import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.model';
import { Connection, Repository } from 'typeorm';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private connection: Connection,
  ) {}

  findAllForUser(user: User): Promise<Post[]> {
    return this.postsRepository.find({
      where: { userId: user.id },
    });
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne(id);
  }

  async genCreatePost(user: User, content: string): Promise<Post> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values([{ content, userId: user.id }])
      .returning('*')
      .execute();
    return result.generatedMaps[0] as Post;
  }
}
