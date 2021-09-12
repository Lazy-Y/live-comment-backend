import { Memoize } from 'typescript-memoize';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { buildPaginator, PaginationOptions } from 'src/paginator';
import Paginator from 'src/paginator/Paginator';

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
  hasNext: Promise<boolean>;
  hasPrev: Promise<boolean>;
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

    @Field(() => Boolean)
    public get hasNext() {
      return this.paginator.hasNext();
    }

    @Field(() => Boolean)
    public get hasPrev() {
      return this.paginator.hasPrev();
    }
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}

export interface IPaginationResolver<T> {
  totalCount(page: IPaginatedType<T>): Promise<number>;
}

class Pagination {
  @Memoize()
  static paginate<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    return Paginated(classRef);
  }
}

export default Pagination;
