import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateAdsDTO {
  @IsString()
  webpageOwnerWalletAddress: string;

  @IsArray()
  ads: string[];

  @IsNumber()
  chainId: string;
}
