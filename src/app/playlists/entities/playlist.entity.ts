import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToMany,
  JoinTable,
  RelationCount,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@/core/users/entities/user.entity';
import { Shadow } from '@/app/shadows/entities/shadow.entity';

@ObjectType()
@Entity()
export class Playlist extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 2000 })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cover: string;

  @Field(() => [Shadow], { nullable: true })
  @ManyToMany(() => Shadow)
  @JoinTable()
  shadows: Shadow[];

  @Field({ nullable: true })
  @RelationCount((playlist: Playlist) => playlist.shadows)
  shadows_count: number;

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
