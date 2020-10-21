import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@/core/users/entities/user.entity';
import { Region } from '../interfaces/shadows.interface';
import { Character } from './character.entity';
import { ShadowMedium } from '../../mediums/entities/shadow_medium.entity';

@ObjectType()
@Entity()
export class Shadow extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public sub_title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public alias_title: string;

  @Field()
  @Column()
  public cover: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  public posters: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public about: string;

  @Field(() => Region)
  @Column({
    nullable: true,
    type: 'enum',
    enum: Region,
    default: Region.Mainland,
  })
  public region: Region;

  @Field(() => [Character], { nullable: true })
  @Column({ type: 'json', nullable: true })
  public credits: Character[];

  @Field(() => [ShadowMedium])
  @OneToMany(
    () => ShadowMedium,
    shadowMedium => shadowMedium.shadow,
    { cascade: true, eager: true },
  )
  public sources: ShadowMedium[];

  @Field(() => User)
  @ManyToOne(() => User, {
    eager: true,
  })
  public author: User;

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
