"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = void 0;
require("dotenv/config");
const ad_entity_1 = require("../entities/ad.entity");
const webpageOwner_entity_1 = require("../entities/webpageOwner.entity");
const viewRecord_entity_1 = require("../entities/viewRecord.entity");
const pageOwnerView_entity_1 = require("../entities/pageOwnerView.entity");
class ConfigService {
    constructor(env) {
        this.env = env;
    }
    getValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }
    getPort() {
        return this.getValue('PORT', true);
    }
    isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }
    getTypeOrmConfig() {
        return {
            type: 'postgres',
            host: this.getValue('PG_HOST'),
            port: parseInt(this.getValue('PG_PORT')),
            username: this.getValue('PG_USER'),
            password: this.getValue('PG_PASSWORD'),
            database: this.getValue('PG_DATABASE'),
            entities: [ad_entity_1.Ad, webpageOwner_entity_1.WebpageOwner, pageOwnerView_entity_1.WebpageOwnerView, viewRecord_entity_1.ViewRecord],
            synchronize: true,
        };
    }
}
const configService = new ConfigService(process.env).ensureValues([
    'PORT',
    'PG_HOST',
    'PG_PORT',
    'PG_USER',
    'PG_PASSWORD',
    'PG_DATABASE',
]);
exports.configService = configService;
//# sourceMappingURL=config.service.js.map