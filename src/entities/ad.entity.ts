import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Campaign } from './campaign.entity';
import { ViewRecord } from './viewRecord.entity';

@Entity()
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  regist_ad_id: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.ads)
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @OneToMany(() => ViewRecord, (viewRecord) => viewRecord.ad)
  viewRecord: ViewRecord[];

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
