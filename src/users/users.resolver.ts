import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from 'src/posts/post.model';
import { PostsService } from 'src/posts/posts.service';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  connection: any;
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('userName') userName: string): Promise<User> {
    return await this.usersService.genCreateUser(userName);
  }

  @ResolveField('posts', () => [Post])
  async getPosts(@Parent() user: User): Promise<Post[]> {
    return await this.postsService.findAllForUser(user);
  }
}
