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
import { User } from '../../users/entities/user.entity';
import { Medium } from '../../mediums/entities/medium.entity';

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
  @Column({ nullable: true, comment: '当前媒体播放的时间点（单位：秒/s）' })
  public point: number;

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  public create_at: Date;

  @Field(type => User)
  @ManyToOne(type => User)
  public author: User;

  @Field(type => Medium)
  @ManyToOne(type => Medium)
  public media: Medium;
}
