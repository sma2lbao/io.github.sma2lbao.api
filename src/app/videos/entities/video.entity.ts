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
import { VideoMedium } from '@/app/mediums/entities/video_medium.entity';

@ObjectType()
@Entity()
export class Video extends BaseEntity {
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

  @Field(() => [VideoMedium])
  @OneToMany(
    () => VideoMedium,
    videoMedium => videoMedium.video,
    { cascade: true, eager: true },
  )
  public sources: VideoMedium[];

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
