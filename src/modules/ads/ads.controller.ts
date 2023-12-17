import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ViewAdsDTO } from './dto/createAds.dto';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async upsertView(@Body() viewAdsDTO: ViewAdsDTO) {
    return await this.adsService.upsertView(viewAdsDTO);
  }

  //core
  // @Post()
  // async upsertAds(@Body() createAdsDto: CreateAdsDTO) {
  //   return this.adsService.upsertAds(createAdsDto);
  // }

  // //manual sendview to contract
  // @Post('sendview')
  // async sendViewToContract() {
  //   return this.adsService.sendViewToContract();
  // }

  // @Post('add-total-earn-by-month')
  // async addTotalEarnByMonth() {
  //   return await this.adsService.addTotalEarnByMonth(3);
  // }

  // @Get('total-earn/:month')
  // async getTotalEarnByMonth(@Param('month') month) {
  //   return this.adsService.getTotalEarnByMonth(month);
  // }

  // @Get('total-ad-view')
  // async getTotalAdViewByMonth() {
  //   return await this.adsService.getTotalAdViewByMonth(3);
  // }

  // @Get('my-total-ad-view')
  // async getMyTotalAdViewByMonth() {
  //   return await this.adsService.getMyTotalAdViewByMonth(
  //     3,
  //     '0x443fe6af640c1e6dec1efc4468451e6765152e94',
  //   );
  // }

  // @Get('get-my-total-earn-by-view')
  // async getEarnByView() {
  //   return await this.adsService.getMyTotalEarnByView(
  //     3,
  //     '0x443fe6af640c1e6dec1efc4468451e6765152e94',
  //   );
  // }
}
