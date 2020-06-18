import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Column,
  ManyToOne,
  TableInheritance,
  ChildEntity,
  JoinColumn,
  BaseEntity,
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
  @Column({ comment: '媒体名称' })
  public name: string;

  @Field()
  @Column({ nullable: true, comment: '别名' })
  public alias_name: string;

  @Field(type => [String])
  @Column('simple-array', { comment: '海报列表', nullable: true })
  public posters: string[];

  @Field()
  @Column({ nullable: true, comment: '简介' })
  public description: string;

  @Field()
  @Column({ nullable: true, comment: '时长' })
  public duration: number;

  @Field()
  @Column({ nullable: true, comment: '预览地址' })
  public preview_url: string;

  @Field()
  @Column({ nullable: false, comment: '默认地址' })
  public url: string;

  @Field()
  @Column({ nullable: true, comment: '低质量地址' })
  public low_quality_url: string;

  @Field()
  @Column({ nullable: true, comment: '中等质量地址' })
  public medium_quality_url: string;

  @Field()
  @Column({ nullable: true, comment: '高质量地址' })
  public high_quality_url: string;

  @Field()
  @Column({ nullable: true, comment: '超高质量地址' })
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
  @VersionColumn({ name: 'version' })
  public version: number;
}
