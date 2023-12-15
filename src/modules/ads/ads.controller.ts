import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdsDTO } from './dto/createAds.dto';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async createAds(@Body() createAdsDto: CreateAdsDTO) {
    return this.adsService.createAds(createAdsDto);
  }
}
