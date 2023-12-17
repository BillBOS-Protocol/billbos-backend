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
exports.WebpageOwnerView = void 0;
const typeorm_1 = require("typeorm");
const webpageOwner_entity_1 = require("./webpageOwner.entity");
let WebpageOwnerView = class WebpageOwnerView {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WebpageOwnerView.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WebpageOwnerView.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], WebpageOwnerView.prototype, "view", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => webpageOwner_entity_1.WebpageOwner, (webpageOwner) => webpageOwner.webpageOwnerView),
    (0, typeorm_1.JoinColumn)({ name: 'webpageOwner_id' }),
    __metadata("design:type", webpageOwner_entity_1.WebpageOwner)
], WebpageOwnerView.prototype, "webpageOwner", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], WebpageOwnerView.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], WebpageOwnerView.prototype, "updatedAt", void 0);
WebpageOwnerView = __decorate([
    (0, typeorm_1.Entity)()
], WebpageOwnerView);
exports.WebpageOwnerView = WebpageOwnerView;
//# sourceMappingURL=pageOwnerView.entity.js.map