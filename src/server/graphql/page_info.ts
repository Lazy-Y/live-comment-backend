import { Field, ObjectType } from '@nestjs/graphql';
import Paginator from '../paginator/Paginator';

@ObjectType()
class PageInfo<T> {
  constructor(private paginator: Paginator<T>) {}

  @Field(() => String, { nullable: true })
  public get endCursor(): Promise<string | null> {
    return this.paginator.getNextAfterCursor();
  }

  @Field(() => Boolean)
  public get hasNextPage(): Promise<boolean> {
    return this.paginator.hasNextPage();
  }

  @Field(() => Boolean)
  public get hasPreviousPage(): Promise<boolean> {
    return this.paginator.hasPrevPage();
  }

  @Field(() => String, { nullable: true })
  public get startCursor(): Promise<string | null> {
    return this.paginator.getNextBeforeCursor();
  }
}

export default PageInfo;
