import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from '@/app/categories/entities/category.entity';

@ObjectType()
@Entity()
export class Tag {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  public label: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  alias: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description: string;

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category, { nullable: true })
  @JoinTable()
  public categories: Category[];

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
}
