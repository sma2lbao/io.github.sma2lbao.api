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
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export class Medium extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public name: string;

  @Field()
  @Column({ nullable: true })
  public alias_name: string;

  @Field(type => [String], { nullable: true })
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
  public created_at: Date;

  @Field()
  @UpdateDateColumn({
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public updated_at: Date;

  @Field()
  @DeleteDateColumn({
    precision: 3,
  })
  public delete_at: Date;

  @Field()
  @VersionColumn({ name: 'version' })
  public version: number;
}
