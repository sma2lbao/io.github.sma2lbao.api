import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Tag {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  public label: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description: string;

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
}
