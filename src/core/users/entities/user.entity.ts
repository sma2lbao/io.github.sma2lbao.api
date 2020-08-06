import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import * as shortid from 'shortid';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Field()
  @PrimaryColumn({
    unique: true,
    length: 30,
    default: () => `'Misser_${shortid.generate()}'`,
    comment: 'username',
  })
  username: string;

  // @Field()
  @HideField()
  @Column({ nullable: true, comment: 'password' })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true, length: 200, comment: 'email' })
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
  public update_at: Date;

  @Field()
  @DeleteDateColumn({
    precision: 3,
  })
  public delete_at: Date;
}
