import { IsArray, IsNumber, IsString } from 'class-validator';

export class ViewAdsDTO {
  @IsString()
  webpageOwnerWalletAddress: string;

  @IsNumber()
  month: number;

  @IsArray()
  ads: adObject[];
}

export class adObject {
  adId: string;
  chainId: string;
}
