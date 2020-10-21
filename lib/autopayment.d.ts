import { IAutoPaymentOrder, IOrderResponseData } from './types';
export declare const autopayment: (APP_ID: string, SECRET: string) => (orderData: IAutoPaymentOrder, log?: boolean | undefined) => Promise<IOrderResponseData | Error | undefined>;
