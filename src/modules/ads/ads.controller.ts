import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAdsDTO } from './dto/createAds.dto';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async upsertAds(@Body() createAdsDto: CreateAdsDTO) {
    return this.adsService.upsertAds(createAdsDto);
  }

  @Post('/sendview')
  async sendViewToContract() {
    return this.adsService.sendViewToContract();
  }

  @Get('total-earn/:month')
  async getTotalEarnByMonth(@Param('month') month) {
    return this.adsService.getTotalEarnByMonth(month);
  }
}
