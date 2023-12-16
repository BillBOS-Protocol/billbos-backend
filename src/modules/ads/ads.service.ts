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

  async upsertAds(createAdsDto: CreateAdsDTO) {
    let { adsId } = createAdsDto;
    adsId = adsId.toLowerCase();
    if (adsId.length === 0) {
      throw new BadRequestException(`AdsId can be empty string`);
    }
    try {
      const existingAds = await this.getAdsById(adsId);
      if (existingAds) {
        existingAds.view++;
        await this.adsRepository.save(existingAds);
        return existingAds;
      } else {
        const ads = this.adsRepository.create();
        ads.ads_id = adsId;
        const adsAdd = await this.adsRepository.save(ads);
        return adsAdd;
      }
    } catch (error) {
      throw new BadRequestException(`add ads fail error:${error}`);
    }
  }

  async getAdsById(id: string) {
    try {
      const ads = await this.adsRepository
        .createQueryBuilder('ads')
        .where('ads.ads_id = :id', { id })
        .getOne();
      return ads;
    } catch (error) {
      throw new BadRequestException(`get ads by id fail error: ${error}`);
    }
  }
}
