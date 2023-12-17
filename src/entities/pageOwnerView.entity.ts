import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WebpageOwner } from './webpageOwner.entity';

@Entity()
export class WebpageOwnerView {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  month: number;

  @Column({ default: 1 })
  view: number;

  @ManyToOne(
    () => WebpageOwner,
    (webpageOwner) => webpageOwner.webpageOwnerView,
  )
  @JoinColumn({ name: 'webpageOwner_id' })
  webpageOwner: WebpageOwner;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
