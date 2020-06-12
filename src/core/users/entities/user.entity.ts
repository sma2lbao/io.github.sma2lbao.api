import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Field()
  @Column({ unique: true, length: 30, comment: '用戶名' })
  username: string;

  @Field()
  @Column({ comment: '密码' })
  password: string;

  @Field()
  @Column({ unique: true, length: 200, comment: '邮箱' })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 30, comment: '昵称' })
  nickname: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: '头像地址' })
  avatar: string;

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true, length: 30, comment: '手机号' })
  mobile: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: '住址' })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: '用户自我描述' })
  description: string;

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  public create_at: Date;
}