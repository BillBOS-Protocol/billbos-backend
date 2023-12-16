import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAdsDTO } from './dto/createAds.dto';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async upsertAds(@Body() createAdsDto: CreateAdsDTO) {
    return this.adsService.upsertAds(createAdsDto);
  }

  @Get('block')
  async getBlock() {
    console.log('cal');

    return await this.adsService.callGreet();
  }
}
