import { ObjectType } from '@nestjs/graphql';
import { ChildEntity, ManyToOne } from 'typeorm';
import { Medium } from '@/app/mediums/entities/medium.entity';
import { Shadow } from '../../shadows/entities/shadow.entity';
import { ChildMedium } from '../interfaces/mediums.interface';

@ObjectType()
@ChildEntity(ChildMedium.SHADOW)
export class ShadowMedium extends Medium {
  @ManyToOne(
    () => Shadow,
    shadow => shadow.sources,
  )
  shadow: Shadow;
}
