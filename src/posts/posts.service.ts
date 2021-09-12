import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { buildPaginator } from 'src/paginator';
import Paginator, { PagingResult } from 'src/paginator/Paginator';
import { User } from 'src/users/user.model';
import { Connection, Repository } from 'typeorm';
import { Post } from './post.model';
import { PaginatedPost } from './post.pagination.model';

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

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async queryAll(): Promise<PaginatedPost> {
    return new PaginatedPost(this.postsRepository.createQueryBuilder('post'), {
      entity: Post,
      // paginationKeys: ['id'],
      // query: {
      //   limit: 3,
      //   order: 'ASC',
      // },
    });
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
