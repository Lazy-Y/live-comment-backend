import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.model';
import { UsersService } from 'src/server/users/users.service';
import { User } from 'src/server/users/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), TypeOrmModule.forRoot()],
  providers: [PostsService, PostsResolver, UsersService],
  exports: [TypeOrmModule],
})
export class PostsModule {}
