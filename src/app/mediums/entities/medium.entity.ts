import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Column,
  TableInheritance,
  BaseEntity,
  DeleteDateColumn,
  RelationCount,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ChildMedium } from '../interfaces/mediums.interface';
import { Vote } from '@/app/votes/entities/vote.entity';
import { VoteStatus } from '@/app/votes/interfaces/votes.interface';

@Entity()
@ObjectType()
@TableInheritance({
  column: { name: 'type', type: 'enum', enum: ChildMedium },
})
export class Medium extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public sub_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public alias_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public cover: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  public posters: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public duration: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public preview_url: string;

  @Field()
  @Column({ nullable: false })
  public url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public low_quality_url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public medium_quality_url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public high_quality_url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public super_quality_url: string;

  @Field(() => [Vote], { nullable: true })
  @OneToMany(
    () => Vote,
    vote => vote.medium,
  )
  public votes: Vote[];

  @Field({ nullable: true })
  @RelationCount(
    (medium: Medium) => medium.votes,
    undefined,
    qb => qb.where('vote.status = :status', { status: VoteStatus.LIKD }),
  )
  public vote_like_count: number;

  @Field({ nullable: true })
  @RelationCount(
    (medium: Medium) => medium.votes,
    undefined,
    qb => qb.where('vote.status = :status', { status: VoteStatus.DISLIKE }),
  )
  public vote_dislike_count: number;

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

  @Field({ nullable: true })
  @VersionColumn({ name: 'version' })
  public version: number;
}
