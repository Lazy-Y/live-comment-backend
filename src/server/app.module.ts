import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot(),
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== 'production' })),
  ],
  controllers: [AppController],
})
export class AppModule {}
