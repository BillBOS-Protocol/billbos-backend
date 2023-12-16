import { IsString } from 'class-validator';

export class CreateAdsDTO {
  @IsString()
  adsId: string;
}
