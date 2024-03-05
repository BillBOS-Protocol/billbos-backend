import { IsArray, IsNumber, IsString } from 'class-validator';

export class ViewAdsDTO {
  @IsString()
  webpageOwnerWalletAddress: string;

  @IsNumber()
  month: number;

  @IsArray()
  ads: AdObject[];
}

export class AdObject {
  @IsString()
  ad_id: string;

  @IsString()
  chainId: string;
}
