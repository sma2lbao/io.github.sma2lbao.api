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
import { Region } from '../interfaces/movies.interface';
import { Character } from './character.entity';
import { MovieMedium } from './movie_medium.entity';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
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

  @Field(() => [String])
  @Column('simple-array')
  public posters: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description: string;

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
  public actors: Character[];

  @Field(() => [Character], { nullable: true })
  @Column('json', { nullable: true })
  public directors: Character[];

  @Field(() => [MovieMedium])
  @OneToMany(
    () => MovieMedium,
    movieMedium => movieMedium.movie,
    { cascade: true, eager: true },
  )
  public sources: MovieMedium[];

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

  @Field()
  @DeleteDateColumn({
    precision: 3,
  })
  public delete_at: Date;
}
