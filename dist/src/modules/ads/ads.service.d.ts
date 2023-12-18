import { ViewAdsDTO } from './dto/createAds.dto';
import { Repository } from 'typeorm';
import { Ad } from 'src/entities/ad.entity';
import { ViewRecord } from 'src/entities/viewRecord.entity';
import { WebpageOwner } from 'src/entities/webpageOwner.entity';
import { WebpageOwnerView } from 'src/entities/pageOwnerView.entity';
export declare class AdsService {
    private readonly adRepository;
    private readonly webpageOwnerRepository;
    private readonly webpageOwnerViewRepository;
    private readonly viewRecordRepository;
    constructor(adRepository: Repository<Ad>, webpageOwnerRepository: Repository<WebpageOwner>, webpageOwnerViewRepository: Repository<WebpageOwnerView>, viewRecordRepository: Repository<ViewRecord>);
    upsertView(viewAdsDTO: ViewAdsDTO): Promise<void>;
    getWebpageOwnerByWalletAddress(walletAddress: string): Promise<WebpageOwner>;
    getAdsViewByAdId(adId: string, month: number, chainId: number): Promise<{
        month: number;
        chainId: number;
        view: number;
    }>;
    getTotalAdView(month: number): Promise<{
        month: number;
        view: number;
    }>;
    getTotalWebpageOwnerView(month: number, walletAddress: string): Promise<{
        webpageOwnerWalletAdderss: string;
        month: number;
        view: number;
    }>;
    getRatioWebpageOwnerviewByAllwebpageOwner(month: number, walletAddress: string): Promise<{
        ration: number;
        month: number;
    }>;
    handleCron(): void;
    sendViewToContract(month: number): Promise<{
        message: string;
    }>;
}
