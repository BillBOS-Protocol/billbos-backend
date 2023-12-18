import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { WebpageOwnerView } from './pageOwnerView.entity';

@Entity()
export class WebpageOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wallet_address: string;

  @OneToMany(
    () => WebpageOwnerView,
    (webpageOwnerView) => webpageOwnerView.webpageOwner,
  )
  webpageOwnerView: WebpageOwnerView[];

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
