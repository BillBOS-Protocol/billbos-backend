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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpageOwner = void 0;
const typeorm_1 = require("typeorm");
const pageOwnerView_entity_1 = require("./pageOwnerView.entity");
let WebpageOwner = class WebpageOwner {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WebpageOwner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WebpageOwner.prototype, "wallet_address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pageOwnerView_entity_1.WebpageOwnerView, (webpageOwnerView) => webpageOwnerView.webpageOwner),
    __metadata("design:type", Array)
], WebpageOwner.prototype, "webpageOwnerView", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], WebpageOwner.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], WebpageOwner.prototype, "updatedAt", void 0);
WebpageOwner = __decorate([
    (0, typeorm_1.Entity)()
], WebpageOwner);
exports.WebpageOwner = WebpageOwner;
//# sourceMappingURL=webpageOwner.entity.js.map