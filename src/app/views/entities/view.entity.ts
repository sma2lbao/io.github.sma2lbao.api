import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@/core/users/entities/user.entity';
import { Medium } from '@/app/mediums/entities/medium.entity';

@ObjectType()
@Entity()
export class View extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => Medium)
  @ManyToOne(() => Medium, { eager: true })
  medium: Medium;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { eager: true })
  owner?: User;

  @Field()
  @CreateDateColumn({
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public create_at: Date;
}
