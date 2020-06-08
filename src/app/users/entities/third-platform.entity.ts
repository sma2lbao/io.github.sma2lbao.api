import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ThirdPlatformEnum } from '../interfaces/users.interface';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class ThirdPlatform {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ comment: '唯一标识' })
  openid: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: 'uid' })
  uid: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: '描述' })
  description: string;

  @Field(type => ThirdPlatformEnum)
  @Column('enum', { comment: '平台', enum: ThirdPlatformEnum })
  platform: ThirdPlatformEnum;

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_at: Date;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
