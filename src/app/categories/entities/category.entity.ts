import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
@Tree('closure-table')
export class Category {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ comment: '类型名称' })
  label: string;

  @Field()
  @Column({ comment: '类型描述' })
  description: string;

  @Field()
  @CreateDateColumn({
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public created_at: Date;

  @Field()
  @UpdateDateColumn({
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public updated_at: Date;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
