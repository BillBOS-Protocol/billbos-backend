import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class BondService {
  constructor(private readonly httpService: HttpService) {}

  async getBond() {
    const body = {
      SecurityCode: 'C0000000013',
    };
    const bond = await lastValueFrom(
      this.httpService
        .post('https://api.sec.or.th/bond/outstanding/issue', body, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': process.env.SECAPI_KEY,
          },
        })
        .pipe(map((res) => res.data)),
    );

    const newMaps = bond.map(({ issued_ref_id, unique_id, name_th }) => ({
      issued_ref_id,
      unique_id,
      name_th,
    }));

    const bondRateArr = [];
    for await (const newMap of newMaps) {
      try {
        const resCupon = await lastValueFrom(
          this.httpService.get(
            `https://api.sec.or.th/bond/outstanding/${newMap.issued_ref_id}/coupon`,
            {
              headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': process.env.SECAPI_KEY,
              },
            },
          ),
        );
        bondRateArr.push(resCupon.data);
      } catch (error) {
        console.error('HTTP request error:', error);
      }
    }

    const transformedArray = bondRateArr.flatMap((innerArray) =>
      innerArray.map((obj) => ({
        coupon_code: obj.coupon_code,
        coupon_rate: obj.coupon_rate,
        last_upd_date: obj.last_upd_date,
      })),
    );
    const mergedArray = transformedArray.map((item, index) => ({
      coupon_code: item.coupon_code,
      coupon_rate: item.coupon_rate,
      last_upd_date: item.last_upd_date,
      issued_ref_id: newMaps[index].issued_ref_id,
      unique_id: newMaps[index].unique_id,
      name_th: newMaps[index].name_th,
    }));
    const shiftmergedArray = mergedArray.slice(1);
    return shiftmergedArray;
  }
}
