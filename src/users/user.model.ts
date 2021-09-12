import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/post.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  @Field()
  id: number;

  @Column({ unique: true })
  @Field()
  userName: string;

  @OneToMany(() => Post, post => post.user)
  @Field(() => [Post])
  posts: Post[];

  @OneToMany(() => Post, post => post.userConnection)
  postConnection: Promise<Post[]>;
}
