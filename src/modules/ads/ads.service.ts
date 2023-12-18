import { BadRequestException, Injectable } from '@nestjs/common';
import { ViewAdsDTO } from './dto/createAds.dto';
import { Repository } from 'typeorm';
import { Ad } from 'src/entities/ad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonRpcProvider, ethers } from 'ethers';
import { getProvider, getSigner } from 'utils/wallet.util';
import { Cron } from '@nestjs/schedule';
import { contractBillBOSAddress } from 'constants/contract-list';

import { ViewRecord } from 'src/entities/viewRecord.entity';
import * as dayjs from 'dayjs';
import { log } from 'console';
import { create } from 'domain';
import { WebpageOwner } from 'src/entities/webpageOwner.entity';
import { WebpageOwnerView } from 'src/entities/pageOwnerView.entity';
import { abi } from 'constants/abi';

@Injectable()
export class AdsService {
  // provider = getProvider();
  // signer = getSigner();
  // contract_bkc = contractAddress[0].contractAddress;
  // contract_jfin = contractAddress[1].contractAddress;
  // provider = new JsonRpcProvider('https://rpc-testnet.bitkubchain.io');
  // signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
  // contractAddress = '0x64ADc655a088ea04a9B1929e9930c4e9E49D962e';

  // abi = [
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: '_billbosAdaptorAddress',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'address',
  //         name: '_stakedTokenAddress',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'nonpayable',
  //     type: 'constructor',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'owner',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'OwnableInvalidOwner',
  //     type: 'error',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'account',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'OwnableUnauthorizedAccount',
  //     type: 'error',
  //   },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'previousOwner',
  //         type: 'address',
  //       },
  //       {
  //         indexed: true,
  //         internalType: 'address',
  //         name: 'newOwner',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'OwnershipTransferred',
  //     type: 'event',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: '_webpageOwner',
  //         type: 'address',
  //       },
  //     ],
  //     name: '_claimReward',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'adsContent',
  //     outputs: [
  //       {
  //         internalType: 'string',
  //         name: 'name',
  //         type: 'string',
  //       },
  //       {
  //         internalType: 'string',
  //         name: 'imageCID',
  //         type: 'string',
  //       },
  //       {
  //         internalType: 'string',
  //         name: 'newTabLink',
  //         type: 'string',
  //       },
  //       {
  //         internalType: 'string',
  //         name: 'widgetLink',
  //         type: 'string',
  //       },
  //       {
  //         internalType: 'bool',
  //         name: 'isInteractive',
  //         type: 'bool',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'adsId',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'adsIdLast',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'adsStakedBalance',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'billbosAdaptorAddress',
  //     outputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '_adsId',
  //         type: 'uint256',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: '_amount',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'boost',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'claimReward',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         components: [
  //           {
  //             internalType: 'string',
  //             name: 'name',
  //             type: 'string',
  //           },
  //           {
  //             internalType: 'string',
  //             name: 'imageCID',
  //             type: 'string',
  //           },
  //           {
  //             internalType: 'string',
  //             name: 'newTabLink',
  //             type: 'string',
  //           },
  //           {
  //             internalType: 'string',
  //             name: 'widgetLink',
  //             type: 'string',
  //           },
  //           {
  //             internalType: 'bool',
  //             name: 'isInteractive',
  //             type: 'bool',
  //           },
  //         ],
  //         internalType: 'struct IBillBOSCore.AdsContent',
  //         name: '_ads',
  //         type: 'tuple',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: '_amount',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'createAds',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '_adsIdLast',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'getAds',
  //     outputs: [
  //       {
  //         components: [
  //           {
  //             internalType: 'uint256',
  //             name: 'adsId',
  //             type: 'uint256',
  //           },
  //           {
  //             components: [
  //               {
  //                 internalType: 'string',
  //                 name: 'name',
  //                 type: 'string',
  //               },
  //               {
  //                 internalType: 'string',
  //                 name: 'imageCID',
  //                 type: 'string',
  //               },
  //               {
  //                 internalType: 'string',
  //                 name: 'newTabLink',
  //                 type: 'string',
  //               },
  //               {
  //                 internalType: 'string',
  //                 name: 'widgetLink',
  //                 type: 'string',
  //               },
  //               {
  //                 internalType: 'bool',
  //                 name: 'isInteractive',
  //                 type: 'bool',
  //               },
  //             ],
  //             internalType: 'struct IBillBOSCore.AdsContent',
  //             name: 'adsContent',
  //             type: 'tuple',
  //           },
  //           {
  //             internalType: 'uint256',
  //             name: 'adsStakedBalance',
  //             type: 'uint256',
  //           },
  //         ],
  //         internalType: 'struct IBillBOSCore.AdsRes[]',
  //         name: '',
  //         type: 'tuple[]',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: '_adsOwner',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'getAdsUser',
  //     outputs: [
  //       {
  //         components: [
  //           {
  //             internalType: 'uint256',
  //             name: 'adsId',
  //             type: 'uint256',
  //           },
  //           {
  //             components: [
  //               {
  //                 internalType: 'string',
  //                 name: 'name',
  //                 type: 'string',
  //               },
  //               {
  //                 internalType: 'string',
  //                 name: 'imageCID',
  //                 type: 'string',
  //               },
  //               {
  //                 internalType: 'string',
  //                 name: 'newTabLink',
  //                 type: 'string',
  //               },
  //               {
  //                 internalType: 'string',
  //                 name: 'widgetLink',
  //                 type: 'string',
  //               },
  //               {
  //                 internalType: 'bool',
  //                 name: 'isInteractive',
  //                 type: 'bool',
  //               },
  //             ],
  //             internalType: 'struct IBillBOSCore.AdsContent',
  //             name: 'adsContent',
  //             type: 'tuple',
  //           },
  //           {
  //             internalType: 'uint256',
  //             name: 'adsStakedBalance',
  //             type: 'uint256',
  //           },
  //         ],
  //         internalType: 'struct IBillBOSCore.AdsRes[]',
  //         name: '',
  //         type: 'tuple[]',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: '_webpageOwner',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'getReward',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'monthClaimedReward',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'monthCount',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'owner',
  //     outputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'platformBalance',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'renounceOwnership',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: '_billbosAdaptorAddress',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'setBillbosAdaptorAddress',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'stakedTokenAddress',
  //     outputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'totalEarningBalanceLast',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'totalStakedBalanceLast',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: 'newOwner',
  //         type: 'address',
  //       },
  //     ],
  //     name: 'transferOwnership',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '_adsId',
  //         type: 'uint256',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: '_amount',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'unboost',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '_adsId',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'unboostAll',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '_adsId',
  //         type: 'uint256',
  //       },
  //       {
  //         components: [
  //           {
  //             internalType: 'string',
  //             name: 'name',
  //             type: 'string',
  //           },
  //           {
  //             internalType: 'string',
  //             name: 'imageCID',
  //             type: 'string',
  //           },
  //           {
  //             internalType: 'string',
  //             name: 'newTabLink',
  //             type: 'string',
  //           },
  //           {
  //             internalType: 'string',
  //             name: 'widgetLink',
  //             type: 'string',
  //           },
  //           {
  //             internalType: 'bool',
  //             name: 'isInteractive',
  //             type: 'bool',
  //           },
  //         ],
  //         internalType: 'struct IBillBOSCore.AdsContent',
  //         name: '_ads',
  //         type: 'tuple',
  //       },
  //     ],
  //     name: 'updateAds',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address[]',
  //         name: '_webpageOwner',
  //         type: 'address[]',
  //       },
  //       {
  //         internalType: 'uint256[]',
  //         name: '_viewCount',
  //         type: 'uint256[]',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: '_totalViewCount',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'uploadAdsReport',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'webpageOwnerIdLast',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  // ];

  // //bkc
  // billbosBKCContract = new ethers.Contract(
  //   // this.contract_bkc,
  //   this.contractAddress,
  //   this.abi,
  //   this.provider,
  // );
  // contractBillBosBKCSigner = this.billbosBKCContract.connect(this.signer);
  // contractSigner = this.billbosBKCContract.connect(this.signer);

  // //jfin
  // billbosJFINContract = new ethers.Contract(
  //   this.contract_jfin,
  //   this.abi,
  //   this.signer,
  // );
  // contractBillBosJFINSigner = this.billbosJFINContract.connect(this.signer);

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
    //for prod get mounthLasted from contract

    //for test
    const currentMonth = viewAdsDTO.month;
    const webpageOwnerWalletAddress = viewAdsDTO.webpageOwnerWalletAddress;
    const ads = viewAdsDTO.ads;
    // const chainId = viewAdsDTO.chainId;

    //webpageOwner
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
        const webpageOwnerViews =
          await this.webpageOwnerViewRepository.create();
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
          const view = await this.viewRecordRepository.create();
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
            const view = await this.viewRecordRepository.create();
            view.month = currentMonth;
            view.ad = existAd;
            await this.viewRecordRepository.save(view);
          } else {
            console.log('have view');

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

  async getAdsViewByAdId(adId: string, month: number) {
    try {
      const ad = await this.adRepository.findOne({
        where: { ad_id: adId },
      });

      const view = await this.viewRecordRepository
        .createQueryBuilder('view')
        .where('view.ad_id = :adId', { adId: ad.id })
        .andWhere('view.month = :month', { month })
        .getOne();
      return {
        month,
        view: view.view,
      };
    } catch (error) {
      throw new BadRequestException(`cant get ad view by adId: ${adId}`);
    }
  }

  async getTotalAdView(month: number) {
    let viewSum = 0;
    try {
      const views = await this.viewRecordRepository
        .createQueryBuilder('view')
        .where('view.month = :month', { month })
        .getMany();

      for await (const view of views) {
        viewSum += view.view;
      }
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
        `fai to getTotalWebpageOwnerView, error:${error}`,
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
    let totalWebpageOwnerViewSumSum = 0;
    for await (const allwebpageOwnerView of allwebpageOwnerViews) {
      totalWebpageOwnerViewSumSum += allwebpageOwnerView.view;
    }

    const ration = webpageOwnerView.view / totalWebpageOwnerViewSumSum;
    return {
      ration,
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

      const view = weppageOwnerView.view;
      webPageOwnerView.push(view);
    }
    const webpageOwnerArr = webpageOwners.map((item) => {
      return item.wallet_address;
    });
    const allwebpageOwnerViews = await this.webpageOwnerViewRepository.find({
      where: { month },
    });
    let totalWebpageOwnerViewSumSum = 0;
    for await (const allwebpageOwnerView of allwebpageOwnerViews) {
      totalWebpageOwnerViewSumSum += allwebpageOwnerView.view;
    }

    // provider = getProvider();
    // signer = getSigner();
    // contract_bkc = contractAddress[0].contractAddress;
    // contract_jfin = contractAddress[1].contractAddress;
    // provider = new JsonRpcProvider('https://rpc-testnet.bitkubchain.io');
    // signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    // contractAddress = '0x64ADc655a088ea04a9B1929e9930c4e9E49D962e';

    //BKC
    //setup
    const provider = new JsonRpcProvider('https://rpc-testnet.bitkubchain.io');
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractAddress = '0x138b32685a9EEf7c14c1587eE441F28Dd5dE2A68';
    const billbosBKCContract = new ethers.Contract(
      contractAddress,
      abi,
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
      //JFIN J2O Taro
      // const provider = new JsonRpcProvider('');
      // const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
      // const contractAddress = '';
      // const billbosJ2OContract = new ethers.Contract(
      //   contractAddress,
      //   abi,
      //   provider,
      // );
      // const contractBillBosJ2OSigner = billbosJ2OContract.connect(signer);
      // const contractSigner = contractBillBosJ2OSigner.connect(signer);
      // const tx = await (contractSigner as any).uploadAdsReport(
      //   webpageOwnerArr,
      //   webPageOwnerView,
      //   totalWebpageOwnerViewSumSum,
      // );
      // await tx.wait();
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
