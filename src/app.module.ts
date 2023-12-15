import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './configs/config.service';
import { AdsModule } from './modules/ads/ads.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), AdsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
