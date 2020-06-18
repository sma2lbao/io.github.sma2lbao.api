import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Medium } from '../../mediums/entities/medium.entity';
import { User } from '@core/users/entities/user.entity';

@ObjectType()
@Entity()
export class Barrage extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column({ comment: '内容' })
  public content: string;

  @Field()
  @Column({ nullable: true })
  public point: number;

  @Field()
  @CreateDateColumn({
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public create_at: Date;

  @Field(type => User)
  @ManyToOne(type => User)
  public author: User;

  @Field(type => Medium)
  @ManyToOne(type => Medium)
  public media: Medium;
}
