import { ViewAdsDTO } from './dto/createAds.dto';
import { AdsService } from './ads.service';
export declare class AdsController {
    private readonly adsService;
    constructor(adsService: AdsService);
    upsertView(viewAdsDTO: ViewAdsDTO): Promise<void>;
    getAdsViewByAdId(query: any): Promise<{
        month: number;
        view: number;
    }>;
    getTotalAdView(query: any): Promise<{
        month: number;
        view: number;
    }>;
    getTotalWebpageOwnerView(query: any): Promise<{
        webpageOwnerWalletAdderss: string;
        month: number;
        view: number;
    }>;
    getRatioWebpageOwnerviewByAllwebpageOwner(query: any): Promise<{
        ration: number;
        month: number;
    }>;
}
