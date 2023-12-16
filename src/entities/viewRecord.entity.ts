import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ad } from './ad.entity';

@Entity()
export class ViewRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ad, (ad) => ad.viewRecord)
  @JoinColumn({ name: 'ad_id' })
  ad: Ad;

  @Column()
  month: number;

  @Column({ default: 0 })
  view: number;

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
