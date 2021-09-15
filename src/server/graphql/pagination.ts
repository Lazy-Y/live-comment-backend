import { Memoize } from 'typescript-memoize';
import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { buildPaginator, PaginationOptions, PagingQuery } from '../paginator';
import Paginator, { Order } from '../paginator/Paginator';
import PageInfo from './page_info';

@InputType()
export class PageArgs implements PagingQuery {
  @Field({ defaultValue: 3 })
  limit: number;

  @Field({ nullable: true })
  afterCursor?: string;

  @Field({ nullable: true })
  beforeCursor?: string;

  @Field({ defaultValue: 'DESC' })
  order: Order;
}

export type PaginationTypeTuple<T> = [Type<IPaginatedType<T>>, Type<IEdgeType<T>>];

export interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  readonly queryBuilder: SelectQueryBuilder<T>;
  readonly paginationOptions: PaginationOptions<T>;
  readonly paginator: Paginator<T>;
  nodes: Promise<T[]>;
  totalCount: Promise<number>;
  nextAfterCursor: Promise<string | null>;
  nextBeforeCursor: Promise<string | null>;
  pageInfo: PageInfo<T>;
}

function Paginated<T>(classRef: Type<T>): PaginationTypeTuple<T> {
  @ObjectType({ isAbstract: true })
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    public paginator: Paginator<T>;

    constructor(public queryBuilder: SelectQueryBuilder<T>, public paginationOptions: PaginationOptions<T>) {
      this.paginator = buildPaginator(this.queryBuilder, this.paginationOptions);
    }

    @Field(() => [classRef], { nullable: true })
    public get nodes() {
      return this.queryBuilder.clone().getMany();
    }

    @Field(() => Int)
    public get totalCount() {
      return this.queryBuilder.clone().getCount();
    }

    @Field(() => String, { nullable: true })
    public get nextAfterCursor() {
      return this.paginator.getNextAfterCursor();
    }

    @Field(() => String, { nullable: true })
    public get nextBeforeCursor() {
      return this.paginator.getNextBeforeCursor();
    }

    @Field(() => PageInfo)
    public get pageInfo(): PageInfo<T> {
      return new PageInfo(this.paginator);
    }
  }

  return [PaginatedType as Type<IPaginatedType<T>>, EdgeType as Type<IEdgeType<T>>];
}

class Pagination {
  @Memoize()
  static paginate<T>(classRef: Type<T>): PaginationTypeTuple<T> {
    return Paginated(classRef);
  }
}

export default Pagination;
