import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { Ad } from 'src/entities/ad.entity';
import { WebpageOwner } from 'src/entities/webpageOwner.entity';
import { ViewRecord } from 'src/entities/viewRecord.entity';
import { WebpageOwnerView } from 'src/entities/pageOwnerView.entity';

// require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('PG_HOST'),
      port: parseInt(this.getValue('PG_PORT')),
      username: this.getValue('PG_USER'),
      password: this.getValue('PG_PASSWORD'),
      database: this.getValue('PG_DATABASE'),
      // entities: ['**/*.entity{.ts,.js}'],
      entities: [Ad, WebpageOwner, WebpageOwnerView, ViewRecord],
      synchronize: true,

      // migrationsTableName: 'migration',

      // migrations: ['src/migration/*.ts'],

      // cli: {
      //   migrationsDir: 'src/migration',
      // },

      // ssl: this.isProduction(),
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

export { configService };
