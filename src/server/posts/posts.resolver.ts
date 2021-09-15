import { Args, Resolver, Query, Mutation, ID, Parent, ResolveField, Int, ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/server/users/user.model';
import { UsersService } from 'src/server/users/users.service';
import { Post } from './post.model';
import { PaginatedPost, PostEdge } from './post.pagination.model';
import { PostsService } from './posts.service';

@ObjectType()
class CreatePostResponse {
  @Field()
  edge: PostEdge;
}

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
  async queryPosts(
    @Args('first', { type: () => Int, defaultValue: 3 }) first: number,
    @Args('after', { type: () => String, defaultValue: null, nullable: true }) after: string,
  ): Promise<PaginatedPost> {
    return this.postsService.queryAll({
      limit: first,
      afterCursor: after,
      order: 'DESC',
    });
  }

  @Mutation(() => CreatePostResponse)
  async createPost(
    @Args('userID', { type: () => ID }) userID: number,
    @Args('content') content: string,
  ): Promise<CreatePostResponse> {
    const user = await this.usersService.findOne(userID);
    const node = await this.postsService.genCreatePost(user, content);
    const cursor = 'TO BE IMPLEMENTED';
    return {
      edge: {
        node,
        cursor,
      },
    };
  }

  @ResolveField()
  public async user(@Parent() post: Post): Promise<User> {
    return this.usersService.findOne(post.userId);
  }
}
