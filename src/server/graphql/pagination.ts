import { Memoize } from 'typescript-memoize';
import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { buildPaginator, PaginationOptions, PagingQuery } from '../paginator';
import Paginator, { Order } from '../paginator/Paginator';

@InputType()
export class PageArgs implements PagingQuery {
  @Field({ defaultValue: 3 })
  limit: number;

  @Field({ nullable: true })
  afterCursor?: string;

  @Field({ nullable: true })
  beforeCursor?: string;

  @Field({ defaultValue: 'ASC' })
  order: Order;
}

export interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  readonly queryBuilder: SelectQueryBuilder<T>;
  readonly paginationOptions: PaginationOptions<T>;
  readonly paginator: Paginator<T>;
  edges: Promise<IEdgeType<T>[]>;
  nodes: Promise<T[]>;
  totalCount: Promise<number>;
  nextAfterCursor: Promise<string | null>;
  nextBeforeCursor: Promise<string | null>;
}

function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
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

    @Field(() => [EdgeType], { nullable: true })
    public get edges() {
      return this.paginator.paginate();
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
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}

class Pagination {
  @Memoize()
  static paginate<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    return Paginated(classRef);
  }
}

export default Pagination;
