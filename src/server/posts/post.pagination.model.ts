import { Field, ObjectType } from '@nestjs/graphql';
import Pagination from 'src/server/graphql/pagination';
import { Post } from './post.model';

@ObjectType()
export class PostEdge extends Pagination.paginate(Post)[1] {}

@ObjectType()
export class PaginatedPost extends Pagination.paginate(Post)[0] {
  @Field(() => [PostEdge], { nullable: true })
  public get edges() {
    return this.paginator.paginate();
  }
}
