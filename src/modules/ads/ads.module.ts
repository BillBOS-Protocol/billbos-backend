import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ads } from 'src/entities/ads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ads])],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
