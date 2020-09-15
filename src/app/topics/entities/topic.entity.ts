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
import { Movie } from '@/app/movies/entities/movie.entity';

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
  @Column({ nullable: true })
  description: string;

  @Field(() => Movie, { nullable: true })
  @ManyToOne(() => Movie, { eager: true })
  top_movie: Movie;

  @Field(() => [Movie], { nullable: true })
  @ManyToMany(() => Movie, { eager: true })
  @JoinTable()
  top_movies: Movie[];

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
