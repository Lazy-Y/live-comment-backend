import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageArgs } from 'src/server/graphql/pagination';
import { User } from 'src/server/users/user.model';
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

  async queryAll(pageArgs: PageArgs): Promise<PaginatedPost> {
    return new PaginatedPost(this.postsRepository.createQueryBuilder(Post.name.toLowerCase()), {
      entity: Post,
      paginationKeys: ['id'],
      query: {
        order: 'ASC',
        ...pageArgs,
      },
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
