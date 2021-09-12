import { Args, Resolver, Query, Mutation, ID, Parent, ResolveField } from '@nestjs/graphql';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
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
  async queryPosts(): Promise<PaginatedPost> {
    return this.postsService.queryAll();
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
