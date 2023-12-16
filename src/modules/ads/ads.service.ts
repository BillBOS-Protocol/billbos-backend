import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdsDTO } from './dto/createAds.dto';
import { Repository } from 'typeorm';
import { Ads } from 'src/entities/ads.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { getProvider, getSigner } from 'utils/wallet.util';

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

  async callGreet() {
    try {
      const greetContractAddress = '0xe95dFbCc7F2506c664589e995d4dE74cd2CE451F';
      const abi = [
        'function setGreeting(string memory _greeting) public',
        'function greet() public view returns (string memory)',
      ];
      const provider = getProvider();
      const signer = getSigner();
      const greetContract = new ethers.Contract(
        greetContractAddress,
        abi,
        provider,
      );
      const contractSigner = greetContract.connect(signer);
      const tx = await (contractSigner as any).setGreeting('0xnutnut');
      await tx.wait();
      console.log('greet =>', await (contractSigner as any).greet());
    } catch (error) {
      console.log('error =>', error);
    }
  }
}
