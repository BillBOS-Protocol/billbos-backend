import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ViewAdsDTO } from './dto/createAds.dto';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async upsertView(@Body() viewAdsDTO: ViewAdsDTO) {
    return await this.adsService.upsertView(viewAdsDTO);
  }

  @Post('send-view')
  async sendViewToContract(@Query() query) {
    const { month } = query;
    return await this.adsService.sendViewToContract(month);
  }

  @Get('ad-view-by-adId')
  async getAdsViewByAdId(
    @Query() query: { adId: string; month: string; chainId: string },
  ) {
    const { adId, month, chainId } = query;
    return await this.adsService.getAdsViewByAdId(adId, +month, +chainId);
  }

  @Get('total-ad-view')
  async getTotalAdView(@Query() query: { month: string }) {
    const { month } = query;
    return await this.adsService.getTotalAdView(+month);
  }

  @Get('total-webpageowner-view-by-owner-address')
  async getTotalWebpageOwnerView(
    @Query() query: { month: string; walletAddress: string },
  ) {
    const { month, walletAddress } = query;

    return await this.adsService.getTotalWebpageOwnerView(
      +month,
      walletAddress,
    );
  }

  @Get('ratio-webpageOwnerview-by-allwebpageOwner')
  async getRatioWebpageOwnerviewByAllwebpageOwner(
    @Query() query: { month: string; walletAddress: string },
  ) {
    const { month, walletAddress } = query;
    return await this.adsService.getRatioWebpageOwnerviewByAllwebpageOwner(
      +month,
      walletAddress,
    );
  }
}
