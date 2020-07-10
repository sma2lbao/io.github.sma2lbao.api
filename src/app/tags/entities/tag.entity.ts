import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Movie } from '@/app/movies/entities/movie.entity';

@ObjectType()
@Entity()
export class Tag {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  public label: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description: string;

  @Field(() => [Movie], { nullable: true })
  @ManyToMany(() => Movie, { nullable: true })
  public movies: Movie[];

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
}
