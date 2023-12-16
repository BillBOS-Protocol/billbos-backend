import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ad } from 'src/entities/ad.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { ViewRecord } from 'src/entities/viewRecord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ad, Campaign, ViewRecord])],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
