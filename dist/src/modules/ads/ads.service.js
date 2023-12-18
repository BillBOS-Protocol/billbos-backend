"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const ad_entity_1 = require("../../entities/ad.entity");
const typeorm_2 = require("@nestjs/typeorm");
const ethers_1 = require("ethers");
const schedule_1 = require("@nestjs/schedule");
const viewRecord_entity_1 = require("../../entities/viewRecord.entity");
const dayjs = require("dayjs");
const webpageOwner_entity_1 = require("../../entities/webpageOwner.entity");
const pageOwnerView_entity_1 = require("../../entities/pageOwnerView.entity");
const abi_1 = require("../../../constants/abi");
let AdsService = class AdsService {
    constructor(adRepository, webpageOwnerRepository, webpageOwnerViewRepository, viewRecordRepository) {
        this.adRepository = adRepository;
        this.webpageOwnerRepository = webpageOwnerRepository;
        this.webpageOwnerViewRepository = webpageOwnerViewRepository;
        this.viewRecordRepository = viewRecordRepository;
    }
    async upsertView(viewAdsDTO) {
        var _a, e_1, _b, _c, _d, e_2, _e, _f;
        const currentMonth = viewAdsDTO.month;
        const webpageOwnerWalletAddress = viewAdsDTO.webpageOwnerWalletAddress;
        const ads = viewAdsDTO.ads;
        const existWebpageOwner = await this.getWebpageOwnerByWalletAddress(webpageOwnerWalletAddress);
        if (existWebpageOwner) {
            const webpageOwnerViews = await this.webpageOwnerViewRepository
                .createQueryBuilder('webpageOwnerview')
                .where('webpageOwnerview.webpageOwner_id = :webpageOwner_id', {
                webpageOwner_id: existWebpageOwner.id,
            })
                .andWhere('webpageOwnerview.month = :month', { month: currentMonth })
                .getOne();
            if (!webpageOwnerViews) {
                const webpageOwnerViews = await this.webpageOwnerViewRepository.create();
                webpageOwnerViews.month = currentMonth;
                webpageOwnerViews.webpageOwner = existWebpageOwner;
                await this.webpageOwnerViewRepository.save(webpageOwnerViews);
            }
            else {
                webpageOwnerViews.view++;
                await this.webpageOwnerViewRepository.save(webpageOwnerViews);
            }
            try {
                for (var _g = true, ads_1 = __asyncValues(ads), ads_1_1; ads_1_1 = await ads_1.next(), _a = ads_1_1.done, !_a;) {
                    _c = ads_1_1.value;
                    _g = false;
                    try {
                        const ad = _c;
                        const existAd = await this.adRepository
                            .createQueryBuilder('ad')
                            .where('ad.ad_id = :ad_id', { ad_id: ad['ad_id'] })
                            .andWhere('ad.chain_id = :chain_id', { chain_id: ad.chainId })
                            .getOne();
                        if (!existAd) {
                            const adCreate = await this.adRepository.create();
                            adCreate.ad_id = ad['ad_id'];
                            adCreate.chain_id = ad.chainId;
                            const adCreated = await this.adRepository.save(adCreate);
                            const view = await this.viewRecordRepository.create();
                            view.month = currentMonth;
                            view.ad = adCreated;
                            await this.viewRecordRepository.save(view);
                        }
                        else {
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
                            }
                            else {
                                console.log('have view');
                                view.view++;
                                await this.viewRecordRepository.save(view);
                            }
                        }
                    }
                    finally {
                        _g = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_g && !_a && (_b = ads_1.return)) await _b.call(ads_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            const webpageOwner = this.webpageOwnerRepository.create();
            webpageOwner.wallet_address = webpageOwnerWalletAddress;
            const webpageOwnerCreate = await this.webpageOwnerRepository.save(webpageOwner);
            const webpageOwnerView = this.webpageOwnerViewRepository.create();
            webpageOwnerView.month = currentMonth;
            webpageOwnerView.webpageOwner = webpageOwnerCreate;
            await this.webpageOwnerViewRepository.save(webpageOwnerView);
            try {
                for (var _h = true, ads_2 = __asyncValues(ads), ads_2_1; ads_2_1 = await ads_2.next(), _d = ads_2_1.done, !_d;) {
                    _f = ads_2_1.value;
                    _h = false;
                    try {
                        const ad = _f;
                        const adEnitity = this.adRepository.create();
                        adEnitity.ad_id = ad['ad_id'];
                        adEnitity.chain_id = ad.chainId;
                        const adCreated = await this.adRepository.save(adEnitity);
                        const view = await this.viewRecordRepository.create();
                        view.month = currentMonth;
                        view.ad = adCreated;
                        await this.viewRecordRepository.save(view);
                    }
                    finally {
                        _h = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_h && !_d && (_e = ads_2.return)) await _e.call(ads_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    async getWebpageOwnerByWalletAddress(walletAddress) {
        try {
            const webpageOwner = await this.webpageOwnerRepository.findOne({
                where: { wallet_address: walletAddress },
            });
            return webpageOwner;
        }
        catch (error) {
            throw new common_1.BadRequestException(`get webpage owner by id fail , error ${error}`);
        }
    }
    async getAdsViewByAdId(adId, month) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException(`cant get ad view by adId: ${adId}`);
        }
    }
    async getTotalAdView(month) {
        var _a, e_3, _b, _c;
        let viewSum = 0;
        try {
            const views = await this.viewRecordRepository
                .createQueryBuilder('view')
                .where('view.month = :month', { month })
                .getMany();
            try {
                for (var _d = true, views_1 = __asyncValues(views), views_1_1; views_1_1 = await views_1.next(), _a = views_1_1.done, !_a;) {
                    _c = views_1_1.value;
                    _d = false;
                    try {
                        const view = _c;
                        viewSum += view.view;
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = views_1.return)) await _b.call(views_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return {
                month,
                view: viewSum,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`getTotalAdView fail, error: ${error}`);
        }
    }
    async getTotalWebpageOwnerView(month, walletAddress) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException(`fai to getTotalWebpageOwnerView, error:${error}`);
        }
    }
    async getRatioWebpageOwnerviewByAllwebpageOwner(month, walletAddress) {
        var _a, e_4, _b, _c;
        const webpageOwnerView = await this.getTotalWebpageOwnerView(month, walletAddress);
        const allwebpageOwnerViews = await this.webpageOwnerViewRepository.find({
            where: { month },
        });
        let totalWebpageOwnerViewSumSum = 0;
        try {
            for (var _d = true, allwebpageOwnerViews_1 = __asyncValues(allwebpageOwnerViews), allwebpageOwnerViews_1_1; allwebpageOwnerViews_1_1 = await allwebpageOwnerViews_1.next(), _a = allwebpageOwnerViews_1_1.done, !_a;) {
                _c = allwebpageOwnerViews_1_1.value;
                _d = false;
                try {
                    const allwebpageOwnerView = _c;
                    totalWebpageOwnerViewSumSum += allwebpageOwnerView.view;
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = allwebpageOwnerViews_1.return)) await _b.call(allwebpageOwnerViews_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        const ration = webpageOwnerView.view / totalWebpageOwnerViewSumSum;
        return {
            ration,
            month,
        };
    }
    handleCron() {
        const currentNonth = dayjs().month() + 1;
        this.sendViewToContract(currentNonth);
    }
    async sendViewToContract(month) {
        var _a, e_5, _b, _c, _d, e_6, _e, _f;
        const webpageOwners = await this.webpageOwnerRepository.find();
        const webPageOwnerView = [];
        try {
            for (var _g = true, webpageOwners_1 = __asyncValues(webpageOwners), webpageOwners_1_1; webpageOwners_1_1 = await webpageOwners_1.next(), _a = webpageOwners_1_1.done, !_a;) {
                _c = webpageOwners_1_1.value;
                _g = false;
                try {
                    const webpageOwner = _c;
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
                finally {
                    _g = true;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = webpageOwners_1.return)) await _b.call(webpageOwners_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        const webpageOwnerArr = webpageOwners.map((item) => {
            return item.wallet_address;
        });
        const allwebpageOwnerViews = await this.webpageOwnerViewRepository.find({
            where: { month },
        });
        let totalWebpageOwnerViewSumSum = 0;
        try {
            for (var _h = true, allwebpageOwnerViews_2 = __asyncValues(allwebpageOwnerViews), allwebpageOwnerViews_2_1; allwebpageOwnerViews_2_1 = await allwebpageOwnerViews_2.next(), _d = allwebpageOwnerViews_2_1.done, !_d;) {
                _f = allwebpageOwnerViews_2_1.value;
                _h = false;
                try {
                    const allwebpageOwnerView = _f;
                    totalWebpageOwnerViewSumSum += allwebpageOwnerView.view;
                }
                finally {
                    _h = true;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (!_h && !_d && (_e = allwebpageOwnerViews_2.return)) await _e.call(allwebpageOwnerViews_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        const provider = new ethers_1.JsonRpcProvider('https://rpc-testnet.bitkubchain.io');
        const signer = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contractAddress = '0x138b32685a9EEf7c14c1587eE441F28Dd5dE2A68';
        const billbosBKCContract = new ethers_1.ethers.Contract(contractAddress, abi_1.abi, provider);
        const contractBillBosBKCSigner = billbosBKCContract.connect(signer);
        const contractSigner = contractBillBosBKCSigner.connect(signer);
        const tx = await contractSigner.uploadAdsReport(webpageOwnerArr, webPageOwnerView, totalWebpageOwnerViewSumSum);
        await tx.wait();
        console.log('done bkc');
        try {
            console.log('done J20');
            return {
                message: "send webpage owner's view to contract success",
            };
        }
        catch (error) {
            throw new error(`call contract sendview to contract fail, error: ${error}`);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('* 0 0 1 * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdsService.prototype, "handleCron", null);
AdsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(ad_entity_1.Ad)),
    __param(1, (0, typeorm_2.InjectRepository)(webpageOwner_entity_1.WebpageOwner)),
    __param(2, (0, typeorm_2.InjectRepository)(pageOwnerView_entity_1.WebpageOwnerView)),
    __param(3, (0, typeorm_2.InjectRepository)(viewRecord_entity_1.ViewRecord)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AdsService);
exports.AdsService = AdsService;
//# sourceMappingURL=ads.service.js.map