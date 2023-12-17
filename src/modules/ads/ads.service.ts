import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdsDTO } from './dto/createAds.dto';
import { Repository } from 'typeorm';
import { Ad } from 'src/entities/ad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { getProvider, getSigner } from 'utils/wallet.util';
import { Cron } from '@nestjs/schedule';
import { contractAddress } from 'constants/contract-list';
import { Campaign } from 'src/entities/campaign.entity';
import { ViewRecord } from 'src/entities/viewRecord.entity';
import * as dayjs from 'dayjs';
import { Earn } from 'src/entities/earn.entity';

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
    @InjectRepository(Ad)
    private readonly adRepository: Repository<Ad>,

    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,

    @InjectRepository(ViewRecord)
    private readonly viewRecordRepository: Repository<ViewRecord>,

    @InjectRepository(Earn)
    private readonly earnRepository: Repository<Earn>,
  ) {}

  // FIXME: check IP

  async upsertAds(createAdsDto: CreateAdsDTO) {
    //For prod
    // const currnetMonth = dayjs().month() + 1;

    //For test
    const currentMonth = 3;
    let ads = createAdsDto.ads;
    let webpageOwnerWalletAddress = createAdsDto.webpageOwnerWalletAddress;
    const { chainId } = createAdsDto;

    //map lowercase
    webpageOwnerWalletAddress = webpageOwnerWalletAddress.toLocaleLowerCase();
    ads = ads.map((ad) => {
      return ad.toLocaleLowerCase();
    });

    try {
      const existingCampaign = await this.getCampaignByWalletAddress(
        webpageOwnerWalletAddress,
      );

      if (existingCampaign) {
        for await (const adItem of ads) {
          const existingAd = await this.getAdById(adItem, existingCampaign.id);

          if (existingAd) {
            const viewRecord = await this.getViewRecordByAdId(
              existingAd.id,
              currentMonth,
            );

            //case not have month
            if (!viewRecord) {
              const viewRecord = this.viewRecordRepository.create();
              viewRecord.month = currentMonth;
              viewRecord.ad = existingAd;
              await this.viewRecordRepository.save(viewRecord);
            } else {
              viewRecord.view++;
              await this.viewRecordRepository.save(viewRecord);
            }
          } else {
            const ad = this.adRepository.create();
            ad.campaign = existingCampaign;
            ad.regist_ad_id = adItem;
            const addCreated = await this.adRepository.save(ad);

            //viewRecord
            const viewRecord = this.viewRecordRepository.create();
            viewRecord.month = currentMonth;
            viewRecord.ad = addCreated;

            await this.viewRecordRepository.save(viewRecord);
          }
        }
        return 'update success';
      } else {
        //campain

        const campaign = this.campaignRepository.create();
        campaign.web_owner_wallet_address = webpageOwnerWalletAddress;
        campaign.chain_id = chainId;
        const compainCreated = await this.campaignRepository.save(campaign);

        //ad
        for await (const adItem of ads) {
          const existingAd = await this.getAdById(adItem, campaign.id);

          if (existingAd) {
            const viewRecord = await this.getViewRecordByAdId(
              existingAd.id,
              currentMonth,
            );
            viewRecord.view++;
            await this.viewRecordRepository.save(viewRecord);
          } else {
            const ad = this.adRepository.create();
            ad.campaign = compainCreated;
            ad.regist_ad_id = adItem;
            const addCreated = await this.adRepository.save(ad);

            //viewRecord
            const viewRecord = this.viewRecordRepository.create();
            viewRecord.month = currentMonth;
            viewRecord.ad = addCreated;

            await this.viewRecordRepository.save(viewRecord);
          }
        }

        return {
          message: 'create success',
        };
      }
    } catch (error) {
      throw new BadRequestException(`add campaign fail error:${error}`);
    }
  }

  async getCampaignByWalletAddress(walletAddress: string) {
    try {
      const campaign = await this.campaignRepository
        .createQueryBuilder('campaign')
        .where('campaign.web_owner_wallet_address = :id', { id: walletAddress })
        .getOne();
      return campaign;
    } catch (error) {
      throw new BadRequestException(`get ads by id fail error: ${error}`);
    }
  }

  // async getAllAds() {
  //   try {
  //     const ads = await this.adRepository.find();
  //     return ads;
  //   } catch (error) {
  //     throw new BadRequestException(`get all ads  error: ${error}`);
  //   }
  // }

  async getAdById(registAdId: string, campaignId: number) {
    try {
      const ad = await this.adRepository
        .createQueryBuilder('ads')
        .where('ads.regist_ad_id = :id', { id: registAdId })
        .andWhere('ads.campaign_id = :campaignId', { campaignId })
        .getOne();
      return ad;
    } catch (error) {
      throw new BadRequestException(`get ads by id fail error: ${error}`);
    }
  }

  async getViewRecordByAdId(adId: number, currentmonth: number) {
    try {
      const viewRecord = await this.viewRecordRepository
        .createQueryBuilder('viewrecord')
        .where('viewrecord.ad_id = :adId', { adId })
        .andWhere('viewrecord.month  = :currentmonth', { currentmonth })
        .getOne();
      return viewRecord;
    } catch (error) {
      throw new BadRequestException(
        `get viewRecord by id fail error: ${error}`,
      );
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
      // const allAds = await this.getAllAds();

      //loop send view to contract
      // allAds.map(async (ads) => {
      console.log('call contract');
      // const adsView = `${ads.view}`;
      // const tx = await (this.contractSigner as any).setGreeting(adsView);
      // await tx.wait();
      console.log('greet =>', await (this.contractSigner as any).greet());

      //reset view
      // await this.resetViewByAdsId(ads.ads_id);
      // });
    } catch (error) {
      throw new BadRequestException(
        `process send view to contract fail error:${error}`,
      );
    }
  }

  // async resetViewByAdsId(adsId: string) {
  //   try {
  //     // const existingAds = await this.getAdById(adsId);
  //     // existingAds.view = 0;
  //     // await this.adRepository.save(existingAds);
  //   } catch (error) {
  //     throw new BadRequestException(`can not reset view by id error: ${error}`);
  //   }
  // }

  async addTotalEarnByMonth(month: string) {
    //call contract to get total earning by month pass month
    //...
    //mock
    const totalMonthEarn = '10000';
    try {
      const earn = await this.earnRepository.create();
      earn.month = month;
      earn.value = totalMonthEarn;
      await this.earnRepository.save(earn);
      return earn;
    } catch (error) {
      throw new BadRequestException(
        ` add total earn month: ${month} fail, error ${error}`,
      );
    }
  }

  async getTotalEarnByMonth(month: string) {
    try {
      const monthEarn = await this.earnRepository.findOne({
        where: { month },
      });
      if (!monthEarn) {
        return {};
      }
      return monthEarn;
    } catch (error) {}
  }

  async getTotalAdViewByMonth(
    month: number,
    webpageOwnerWalletAddress: string,
  ) {
    let viewsum = 0;
    const campaign = await this.getCampaignByWalletAddress(
      webpageOwnerWalletAddress,
    );

    const ads = await this.adRepository
      .createQueryBuilder('ad')
      .where('ad.campaign_id = :campaign_id', { campaign_id: campaign.id })
      .getMany();

    for await (const ad of ads) {
      const view = await this.viewRecordRepository
        .createQueryBuilder('view')
        .where('view.ad_id = :ad_id', { ad_id: ad.id })
        .where('view.month = :month', { month })
        .getOne();

      if (!view) {
        viewsum += 0;
      } else {
        viewsum += view.view;
      }
    }

    return viewsum;
  }
}
