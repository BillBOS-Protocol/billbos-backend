import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
declare class ConfigService {
    private env;
    constructor(env: {
        [k: string]: string | undefined;
    });
    private getValue;
    ensureValues(keys: string[]): this;
    getPort(): string;
    isProduction(): boolean;
    getTypeOrmConfig(): TypeOrmModuleOptions;
}
declare const configService: ConfigService;
export { configService };
