import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ad } from 'src/database/entities/ad.entity';

import { ViewRecord } from 'src/database/entities/viewRecord.entity';
import { WebpageOwner } from 'src/database/entities/webpageOwner.entity';
import { WebpageOwnerView } from 'src/database/entities/pageOwnerView.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ad, WebpageOwner, WebpageOwnerView, ViewRecord]),
  ],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
