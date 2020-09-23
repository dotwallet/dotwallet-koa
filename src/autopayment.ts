import axios from 'axios';
import { Context, Next } from 'koa';

import { IAutoPaymentOrder, IOrderResponseData } from './types';
export const autopayment = (APP_ID: string, SECRET: string) => {
  return async (
    ctx: Context,
    orderData: IAutoPaymentOrder,
    redirect?: string,
    log?: boolean,
  ): Promise<IOrderResponseData | Error | undefined> => {
    try {
      let returnData: IOrderResponseData;

      // could add check here if recieve address is dev's own
      if (log) console.log('==============orderData==============\n', orderData);
      const orderWithSecret = {
        ...orderData,
        secret: SECRET,
      };
      if (log) console.log('==============posting order==============\n', orderWithSecret);
      const orderResponse = await axios.post('https://www.ddpurse.com/openapi/pay_small_money', orderWithSecret);
      const orderResponseData = orderResponse.data;
      if (log) console.log('==============orderResponseData==============', orderResponseData);
      if (orderResponseData.code === -101001 || orderResponseData.code === -10039) {
        if (redirect && redirect.includes('http')) {
          ctx.response.redirect(`https://www.ddpurse.com/openapi/set_pay_config?app_id=${APP_ID}
      &redirect_uri=${redirect}`);
        } else {
          returnData = { error: orderResponseData.data };
          return returnData;
        }
      } else if (orderResponseData.code !== 0) throw orderResponse;
      if (orderResponseData.data) {
        returnData = orderResponseData.data;
        return returnData;
      } else {
        throw orderResponseData;
      }
    } catch (err) {
      if (log) console.log('==============err==============\n', err);
      return err;
    }
  };
};
