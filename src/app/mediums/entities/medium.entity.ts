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
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export class Medium extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public name: string;

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

  @Field()
  @VersionColumn({ name: 'version' })
  public version: number;
}
