import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Review } from './review.entity';
import { User } from '@/core/users/entities/user.entity';

@ObjectType()
@Entity()
export class Reply extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @ManyToOne(() => Review)
  review: Review;

  @Field(() => User)
  @ManyToOne(() => User)
  author: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  replyto: User;

  @Field()
  @CreateDateColumn({
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public create_at: Date;

  @Field()
  @UpdateDateColumn({
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public update_at: Date;

  @Field()
  @DeleteDateColumn({
    precision: 3,
  })
  public delete_at: Date;
}
