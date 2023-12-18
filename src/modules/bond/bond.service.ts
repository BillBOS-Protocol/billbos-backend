import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BondService {
  async getTestBond() {
    const body = {
      SecurityCode: 'C0000000013',
    };
    const res = await fetch('https://api.sec.or.th/bond/outstanding/issue', {
      method: 'POST',
      body: JSON.stringify(body),
      // Request headers
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': process.env.SECAPI_KEY,
      },
    });
    const bondResArr = await res.json();

    //array1
    const newMaps = bondResArr.map(({ issued_ref_id, unique_id, name_th }) => ({
      issued_ref_id,
      unique_id,
      name_th,
    }));

    // console.log('newMap =>', newMaps);
    const bondRateArr = [];
    for await (const newMap of newMaps) {
      const resCupon = await fetch(
        `https://api.sec.or.th/bond/outstanding/${newMap.issued_ref_id}/coupon`,
        {
          method: 'GET',
          // Request headers
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': process.env.SECAPI_KEY,
          },
        },
      );
      const resres = await resCupon.json();
      bondRateArr.push(resres);
    }
    // console.log('bondRateArr', bondRateArr);

    //array2
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
