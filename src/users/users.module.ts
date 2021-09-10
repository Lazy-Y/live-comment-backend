import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/post.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post]), TypeOrmModule.forRoot()],
  providers: [UsersService, UsersResolver, PostsService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
