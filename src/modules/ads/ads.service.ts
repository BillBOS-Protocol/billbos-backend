import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdsDTO } from './dto/createAds.dto';
import { Repository } from 'typeorm';
import { Ads } from 'src/entities/ads.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { getProvider, getSigner } from 'utils/wallet.util';
import { Cron } from '@nestjs/schedule';
import { contractAddress } from 'constants/contract-list';

@Injectable()
export class AdsService {
  provider = getProvider();
  signer = getSigner();
  contract = contractAddress[0].contractAddress;
  abi = [
    'function setGreeting(string memory _greeting) public',
    'function greet() public view returns (string memory)',
  ];
  greetContract = new ethers.Contract(this.contract, this.abi, this.provider);
  contractSigner = this.greetContract.connect(this.signer);

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

  async getAllAds() {
    try {
      const ads = await this.adsRepository.find();
      return ads;
    } catch (error) {
      throw new BadRequestException(`get all ads  error: ${error}`);
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

  // [for prod] 0 0 1 * *  = At 00:00 on day-of-month 1.
  // [for test] 5 * * * * *  = every minute, on the 5th second
  @Cron('* 0 0 1 * *')
  handleCron() {
    this.sendViewToContract();
  }

  async sendViewToContract() {
    try {
      //get all adsView
      const allAds = await this.getAllAds();

      //loop send view to contract
      allAds.map(async (ads) => {
        console.log('call contract');
        const adsView = `${ads.view}`;
        const tx = await (this.contractSigner as any).setGreeting(adsView);
        await tx.wait();
        console.log('greet =>', await (this.contractSigner as any).greet());

        //reset view
        await this.resetViewByAdsId(ads.ads_id);
      });
    } catch (error) {
      throw new BadRequestException(
        `process send view to contract fail error:${error}`,
      );
    }
  }

  async resetViewByAdsId(adsId: string) {
    try {
      const existingAds = await this.getAdsById(adsId);
      existingAds.view = 0;
      await this.adsRepository.save(existingAds);
    } catch (error) {
      throw new BadRequestException(`can not reset view by id error: ${error}`);
    }
  }
}
