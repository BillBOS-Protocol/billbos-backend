import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ad } from 'src/entities/ad.entity';

import { ViewRecord } from 'src/entities/viewRecord.entity';
import { Earn } from 'src/entities/earn.entity';
import { WebpageOwner } from 'src/entities/webpageOwner.entity';
import { WebpageOwnerView } from 'src/entities/pageOwnerView.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ad,
      WebpageOwner,
      WebpageOwnerView,
      ViewRecord,
      Earn,
    ]),
  ],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
