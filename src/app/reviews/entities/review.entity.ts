import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  TableInheritance,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@/core/users/entities/user.entity';
import { ReviewMedium } from '../interfaces/reviews.interface';

@ObjectType()
@Entity()
@TableInheritance({
  column: { name: 'type', type: 'enum', enum: ReviewMedium },
})
export class Review extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 500 })
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, { cascade: true, eager: true })
  author: User;

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

  @Field({ nullable: true })
  @DeleteDateColumn({
    precision: 3,
  })
  public delete_at: Date;
}
