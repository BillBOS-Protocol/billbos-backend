import { IsNumber, IsString } from 'class-validator';

export class GetAdViewByAdId {
  @IsString()
  adId: string;

  @IsNumber()
  month: number;
}

export class adObject {
  adId: string;
  chainId: string;
}
