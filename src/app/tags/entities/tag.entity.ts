import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Tag {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ comment: '标签名称', unique: true })
  label: string;

  @Field()
  @Column({ comment: '标签描述', nullable: true })
  description: string;

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  public created_at: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '最后修改时间',
  })
  public updated_at: Date;
}
