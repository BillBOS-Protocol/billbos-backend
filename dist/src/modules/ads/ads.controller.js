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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsController = void 0;
const common_1 = require("@nestjs/common");
const createAds_dto_1 = require("./dto/createAds.dto");
const ads_service_1 = require("./ads.service");
let AdsController = class AdsController {
    constructor(adsService) {
        this.adsService = adsService;
    }
    async upsertView(viewAdsDTO) {
        return await this.adsService.upsertView(viewAdsDTO);
    }
    async sendViewToContract(query) {
        const { month } = query;
        return await this.adsService.sendViewToContract(month);
    }
    async getAdsViewByAdId(query) {
        const { adId, month } = query;
        return await this.adsService.getAdsViewByAdId(adId, +month);
    }
    async getTotalAdView(query) {
        const { month } = query;
        return await this.adsService.getTotalAdView(+month);
    }
    async getTotalWebpageOwnerView(query) {
        const { month, walletAddress } = query;
        return await this.adsService.getTotalWebpageOwnerView(+month, walletAddress);
    }
    async getRatioWebpageOwnerviewByAllwebpageOwner(query) {
        const { month, walletAddress } = query;
        return await this.adsService.getRatioWebpageOwnerviewByAllwebpageOwner(+month, walletAddress);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAds_dto_1.ViewAdsDTO]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "upsertView", null);
__decorate([
    (0, common_1.Post)('sendView'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "sendViewToContract", null);
__decorate([
    (0, common_1.Get)('ad-view-by-adId'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getAdsViewByAdId", null);
__decorate([
    (0, common_1.Get)('total-ad-view'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getTotalAdView", null);
__decorate([
    (0, common_1.Get)('total-webpageowner-view-by-owner-address'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getTotalWebpageOwnerView", null);
__decorate([
    (0, common_1.Get)('ratio-webpageOwnerview-by-allwebpageOwner'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getRatioWebpageOwnerviewByAllwebpageOwner", null);
AdsController = __decorate([
    (0, common_1.Controller)('ads'),
    __metadata("design:paramtypes", [ads_service_1.AdsService])
], AdsController);
exports.AdsController = AdsController;
//# sourceMappingURL=ads.controller.js.map