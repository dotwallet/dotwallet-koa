import { IOrderData, IOrderStatusInfo } from './types';
export declare const handleOrder: (APP_ID: string, SECRET: string) => (orderData: IOrderData, log?: boolean | undefined) => Promise<string | Error | undefined>;
export declare const getOrderStatus: (APP_ID: string, SECRET: string, log?: boolean | undefined) => (merchant_order_sn: string) => Promise<IOrderStatusInfo | Error | undefined>;
