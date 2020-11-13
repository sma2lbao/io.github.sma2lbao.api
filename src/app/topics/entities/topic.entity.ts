import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Shadow } from '@/app/shadows/entities/shadow.entity';

@Entity()
@ObjectType()
export class Topic extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 2000 })
  description: string;

  @Field(() => Shadow, { nullable: true })
  @ManyToOne(() => Shadow, { eager: true })
  top_shadow: Shadow;

  @Field(() => [Shadow], { nullable: true })
  @ManyToMany(() => Shadow, { eager: true })
  @JoinTable()
  top_shadows: Shadow[];

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
