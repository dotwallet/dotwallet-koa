import { Context } from 'koa';
import { IAutoPaymentOrder, IOrderResponseData } from './types';
export declare const autopayment: (APP_ID: string, SECRET: string) => (ctx: Context, orderData: IAutoPaymentOrder, redirect?: string | undefined, log?: boolean | undefined) => Promise<IOrderResponseData | Error | undefined>;
