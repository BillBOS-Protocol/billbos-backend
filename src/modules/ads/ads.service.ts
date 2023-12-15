import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateAdsDTO } from './dto/createAds.dto';
import { Repository } from 'typeorm';
import { Ads } from 'src/entities/ads.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ads)
    private readonly adsRepository: Repository<Ads>,
  ) {}

  async createAds(createAdsDto: CreateAdsDTO) {
    const { walletAddress, adsId } = createAdsDto;

    const ads = this.adsRepository.create();
    ads.walletAddress = walletAddress;
    ads.ads_id = adsId;

    try {
      const adsAdd = await this.adsRepository.save(ads);
      return adsAdd;
    } catch (error) {
      throw new BadRequestException(`add ads fail error:${error}`);
    }
  }
}
