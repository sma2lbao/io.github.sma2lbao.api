import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { ThirdPlatformEnum } from '../interfaces/users.interface';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class ThirdPlatform extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ comment: 'openid' })
  openid: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: 'tuid' })
  third_uid: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: 'description' })
  description: string;

  @Field(type => ThirdPlatformEnum)
  @Column('enum', { comment: 'platform', enum: ThirdPlatformEnum })
  platform: ThirdPlatformEnum;

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    comment: 'create time',
  })
  create_at: Date;

  @Field(type => User)
  @ManyToOne(type => User)
  user: User;
}
