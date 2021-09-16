import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/server/users/user.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  @Field(() => String)
  id: number;

  @Column()
  @Field()
  content: string;

  @Column()
  userId: number;

  @Field(() => User)
  user: User;

  @ManyToOne(() => User, user => user.postConnection, { primary: true })
  @JoinColumn({ name: 'userId' })
  userConnection: Promise<User>;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  public updatedAt: Date;
}
