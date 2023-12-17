import { IsArray, IsNumber, IsString } from 'class-validator';

export class ViewAdsDTO {
  @IsString()
  webpageOwnerWalletAddress: string;

  @IsArray()
  ads: adObject[];
}

export class adObject {
  adId: string;
  chainId: string;
}
