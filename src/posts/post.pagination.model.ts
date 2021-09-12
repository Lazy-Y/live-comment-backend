import { ObjectType } from '@nestjs/graphql';
import Pagination from 'src/graphql/pagination';
import { Post } from './post.model';

@ObjectType()
export class PaginatedPost extends Pagination.paginate(Post) {}
