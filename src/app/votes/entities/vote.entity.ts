import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { VoteStatus } from '../interfaces/votes.interface';
import { User } from '@/core/users/entities/user.entity';
import { Medium } from '@/app/mediums/entities/medium.entity';

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => VoteStatus)
  @Column('enum', { comment: 'status', enum: VoteStatus })
  public status: VoteStatus;

  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  owner: User;

  @Field(() => Medium)
  @ManyToOne(() => Medium, { eager: true })
  medium: Medium;

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
