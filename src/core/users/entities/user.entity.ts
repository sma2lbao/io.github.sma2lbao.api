import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID, HideField, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Field()
  @Column({ unique: true, length: 30, comment: 'username' })
  username: string;

  @Field()
  @HideField()
  @Column({ comment: 'password' })
  password: string;

  @Field()
  @Column({ unique: true, length: 200, comment: 'email' })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 30, comment: 'nickname' })
  nickname: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: 'avatar' })
  avatar: string;

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true, length: 30, comment: 'mobile' })
  mobile: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: 'address' })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true, comment: 'description' })
  description: string;

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
  public updated_at: Date;
}
