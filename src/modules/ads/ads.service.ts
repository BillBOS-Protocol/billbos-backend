import { BadRequestException, Injectable } from '@nestjs/common';
import { ViewAdsDTO } from './dto/createAds.dto';
import { Repository } from 'typeorm';
import { Ad } from 'src/database/entities/ad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonRpcProvider, ethers } from 'ethers';
import { Cron } from '@nestjs/schedule';

import { ViewRecord } from 'src/database/entities/viewRecord.entity';
import * as dayjs from 'dayjs';
import { WebpageOwner } from 'src/database/entities/webpageOwner.entity';
import { WebpageOwnerView } from 'src/database/entities/pageOwnerView.entity';
import { BillBOSCore_ABI } from 'src/constants/abis/billbos-core.abi';
import { getAddressList, getChain } from 'utils/chain.util';
import { Network_ID } from 'src/constants/network-id.enum';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly adRepository: Repository<Ad>,

    @InjectRepository(WebpageOwner)
    private readonly webpageOwnerRepository: Repository<WebpageOwner>,

    @InjectRepository(WebpageOwnerView)
    private readonly webpageOwnerViewRepository: Repository<WebpageOwnerView>,

    @InjectRepository(ViewRecord)
    private readonly viewRecordRepository: Repository<ViewRecord>,
  ) {}

  async upsertView(viewAdsDTO: ViewAdsDTO) {
    const currentMonth = viewAdsDTO.month;
    const webpageOwnerWalletAddress = viewAdsDTO.webpageOwnerWalletAddress;
    const ads = viewAdsDTO.ads;
    // const chainId = viewAdsDTO.chainId;

    // check webpageOwner is existed ??
    const existWebpageOwner = await this.getWebpageOwnerByWalletAddress(
      webpageOwnerWalletAddress,
    );
    if (existWebpageOwner) {
      //webpage owner
      const webpageOwnerViews = await this.webpageOwnerViewRepository
        .createQueryBuilder('webpageOwnerview')
        .where('webpageOwnerview.webpageOwner_id = :webpageOwner_id', {
          webpageOwner_id: existWebpageOwner.id,
        })
        .andWhere('webpageOwnerview.month = :month', { month: currentMonth })
        .getOne();
      if (!webpageOwnerViews) {
        const webpageOwnerViews = this.webpageOwnerViewRepository.create();
        webpageOwnerViews.month = currentMonth;
        webpageOwnerViews.webpageOwner = existWebpageOwner;
        await this.webpageOwnerViewRepository.save(webpageOwnerViews);
      } else {
        webpageOwnerViews.view++;
        await this.webpageOwnerViewRepository.save(webpageOwnerViews);
      }
      //ad
      for await (const ad of ads) {
        const existAd = await this.adRepository
          .createQueryBuilder('ad')
          .where('ad.ad_id = :ad_id', { ad_id: ad['ad_id'] })
          .andWhere('ad.chain_id = :chain_id', { chain_id: ad.chainId })
          .getOne();

        if (!existAd) {
          //ad
          const adCreate = await this.adRepository.create();
          adCreate.ad_id = ad['ad_id'];
          adCreate.chain_id = ad.chainId;
          const adCreated = await this.adRepository.save(adCreate);

          //ad view
          const view = this.viewRecordRepository.create();
          view.month = currentMonth;
          view.ad = adCreated;

          await this.viewRecordRepository.save(view);
        } else {
          const view = await this.viewRecordRepository
            .createQueryBuilder('view')
            .where('view.ad_id = :ad_id', { ad_id: existAd.id })
            .andWhere('view.month = :month', { month: currentMonth })
            .getOne();
          if (!view) {
            const view = this.viewRecordRepository.create();
            view.month = currentMonth;
            view.ad = existAd;
            await this.viewRecordRepository.save(view);
          } else {
            view.view++;
            await this.viewRecordRepository.save(view);
          }
        }
      }
    }
    // new webpageOwner
    else {
      const webpageOwner = this.webpageOwnerRepository.create();
      webpageOwner.wallet_address = webpageOwnerWalletAddress;
      const webpageOwnerCreate = await this.webpageOwnerRepository.save(
        webpageOwner,
      );

      const webpageOwnerView = this.webpageOwnerViewRepository.create();
      webpageOwnerView.month = currentMonth;
      webpageOwnerView.webpageOwner = webpageOwnerCreate;
      await this.webpageOwnerViewRepository.save(webpageOwnerView);

      //ad
      for await (const ad of ads) {
        const adEnitity = this.adRepository.create();
        adEnitity.ad_id = ad['ad_id'];
        adEnitity.chain_id = ad.chainId;
        const adCreated = await this.adRepository.save(adEnitity);

        //adview
        const view = await this.viewRecordRepository.create();
        view.month = currentMonth;
        view.ad = adCreated;

        await this.viewRecordRepository.save(view);
      }
    }
  }

  async getWebpageOwnerByWalletAddress(walletAddress: string) {
    try {
      const webpageOwner = await this.webpageOwnerRepository.findOne({
        where: { wallet_address: walletAddress },
      });
      return webpageOwner;
    } catch (error) {
      throw new BadRequestException(
        `get webpage owner by id fail , error ${error}`,
      );
    }
  }

  async getAdsViewByAdId(adId: string, month: number, chainId: number) {
    try {
      const ad = await this.adRepository
        .createQueryBuilder('ad')
        .where('ad.ad_id = :adId', { adId })
        .andWhere('ad.chain_id = :chainId', { chainId })
        .getOne();

      const view = await this.viewRecordRepository
        .createQueryBuilder('view')
        .where('view.ad_id = :adId', { adId: ad.id })
        .andWhere('view.month = :month', { month })
        .getOne();
      return {
        month,
        chainId,
        view: view.view,
      };
    } catch (error) {
      throw new BadRequestException(
        `cant get ad view by adId: ${adId}, error:${error}`,
      );
    }
  }

  async getTotalAdView(month: number) {
    try {
      const views = await this.viewRecordRepository
        .createQueryBuilder('view')
        .where('view.month = :month', { month })
        .getMany();

      const viewSum = views.reduce((acc, cur) => {
        return acc + cur.view;
      }, 0);
      return {
        month,
        view: viewSum,
      };
    } catch (error) {
      throw new BadRequestException(`getTotalAdView fail, error: ${error}`);
    }
  }

  async getTotalWebpageOwnerView(month: number, walletAddress: string) {
    try {
      const webpageOwner = await this.webpageOwnerRepository.findOne({
        where: { wallet_address: walletAddress },
      });

      const webpageOwnerView = await this.webpageOwnerViewRepository
        .createQueryBuilder('webpageOwnerView')
        .where('webpageOwnerView.webpageOwner_id = :webpageOwner_id', {
          webpageOwner_id: webpageOwner.id,
        })
        .andWhere('webpageOwnerView.month = :month', { month })
        .getOne();

      return {
        webpageOwnerWalletAdderss: walletAddress,
        month,
        view: webpageOwnerView.view,
      };
    } catch (error) {
      throw new BadRequestException(
        `failed to getTotalWebpageOwnerView, error:${error}`,
      );
    }
  }

  async getRatioWebpageOwnerviewByAllwebpageOwner(
    month: number,
    walletAddress: string,
  ) {
    const webpageOwnerView = await this.getTotalWebpageOwnerView(
      month,
      walletAddress,
    );

    const allwebpageOwnerViews = await this.webpageOwnerViewRepository.find({
      where: { month },
    });

    const totalWebpageOwnerViewSumSum = allwebpageOwnerViews.reduce(
      (acc, cur) => {
        return acc + cur.view;
      },
      0,
    );

    const ratio = webpageOwnerView.view / totalWebpageOwnerViewSumSum;
    return {
      ratio,
      month,
    };
  }

  @Cron('* 0 0 1 * *')
  handleCron() {
    const currentNonth = dayjs().month() + 1;
    this.sendViewToContract(currentNonth);
  }

  async sendViewToContract(month: number) {
    const webpageOwners = await this.webpageOwnerRepository.find();
    // let sumAllWebpageOwnerView = 0;
    const webPageOwnerView = [];
    for await (const webpageOwner of webpageOwners) {
      const weppageOwnerView = await this.webpageOwnerViewRepository
        .createQueryBuilder('webpageOwnerView')
        .where('webpageOwnerView.webpageOwner_id = :webpageOwner_id', {
          webpageOwner_id: webpageOwner.id,
        })
        .andWhere('webpageOwnerView.month = :month', { month })
        .getOne();
      if (!weppageOwnerView) {
        webPageOwnerView.push(0);
      } else {
        const view = weppageOwnerView.view;
        webPageOwnerView.push(view);
      }
    }

    const webpageOwnerArr = webpageOwners.map((item) => {
      return item.wallet_address;
    });
    const allwebpageOwnerViews = await this.webpageOwnerViewRepository.find({
      where: { month },
    });

    const totalWebpageOwnerViewSumSum = allwebpageOwnerViews.reduce(
      (acc, cur) => {
        return acc + cur.view;
      },
      0,
    );

    //BKC
    //setup
    const provider = new JsonRpcProvider(
      getChain(Network_ID.BkcTest).rpcUrls[0],
    );
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractAddress = getAddressList(Network_ID.BkcTest).BillBOSCore;
    const billbosBKCContract = new ethers.Contract(
      contractAddress,
      BillBOSCore_ABI,
      provider,
    );
    const contractBillBosBKCSigner = billbosBKCContract.connect(signer);
    const contractSigner = contractBillBosBKCSigner.connect(signer);
    const tx = await (contractSigner as any).uploadAdsReport(
      webpageOwnerArr,
      webPageOwnerView,
      totalWebpageOwnerViewSumSum,
    );
    await tx.wait();
    console.log('done bkc');

    try {
      // J2O Taro
      const provider = new JsonRpcProvider(
        getChain(Network_ID.J2OTaro).rpcUrls[0],
      );
      const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
      const contractAddress = getAddressList(Network_ID.J2OTaro).BillBOSCore;
      const billbosJ2OContract = new ethers.Contract(
        contractAddress,
        BillBOSCore_ABI,
        provider,
      );
      const contractBillBosJ2OSigner = billbosJ2OContract.connect(signer);
      const contractSigner = contractBillBosJ2OSigner.connect(signer);
      const tx = await (contractSigner as any).uploadAdsReport(
        webpageOwnerArr,
        webPageOwnerView,
        totalWebpageOwnerViewSumSum,
      );
      await tx.wait();
      console.log('done J20');
      return {
        message: "send webpage owner's view to contract success",
      };
    } catch (error) {
      throw new error(
        `call contract sendview to contract fail, error: ${error}`,
      );
    }
  }
}
