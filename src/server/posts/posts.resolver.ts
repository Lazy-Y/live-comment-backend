import { Args, Resolver, Query, Mutation, ID, Parent, ResolveField } from '@nestjs/graphql';
import { PageArgs } from 'src/server/graphql/pagination';
import { User } from 'src/server/users/user.model';
import { UsersService } from 'src/server/users/users.service';
import { Post } from './post.model';
import { PaginatedPost } from './post.pagination.model';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postsService: PostsService, private usersService: UsersService) {}

  @Query(() => Post)
  post(@Args('id', { type: () => ID }) id: number) {
    return this.postsService.findOne(id);
  }

  @Query(() => [Post])
  allPosts() {
    return this.postsService.findAll();
  }

  @Query(() => PaginatedPost)
  async queryPosts(@Args('pageArg', { type: () => PageArgs }) args: PageArgs): Promise<PaginatedPost> {
    return this.postsService.queryAll(args);
  }

  @Mutation(() => Post)
  async createPost(
    @Args('userID', { type: () => ID }) userID: number,
    @Args('content') content: string,
  ): Promise<Post> {
    const user = await this.usersService.findOne(userID);
    return await this.postsService.genCreatePost(user, content);
  }

  @ResolveField()
  public async user(@Parent() post: Post): Promise<User> {
    return this.usersService.findOne(post.userId);
  }
}
