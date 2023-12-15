import { IsString } from 'class-validator';

export class CreateAdsDTO {
  @IsString()
  walletAddress: string;

  @IsString()
  adsId: string;
}
