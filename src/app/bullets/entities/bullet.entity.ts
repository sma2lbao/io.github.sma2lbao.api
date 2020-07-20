import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Medium } from '../../mediums/entities/medium.entity';
import { User } from '@core/users/entities/user.entity';

@ObjectType()
@Entity()
export class Bullet extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public content: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public point: number;

  @Field()
  @CreateDateColumn({
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public create_at: Date;

  @Field(() => User)
  @ManyToOne(() => User)
  public author: User;

  @Field(() => Medium)
  @ManyToOne(() => Medium)
  public medium: Medium;
}
