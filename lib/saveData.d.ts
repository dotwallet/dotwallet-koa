import { dataType, IGetHostedResponse, IGetBalanceResponse, ISaveDataResponse } from './types';
export declare const saveData: (APP_ID: string, SECRET: string) => (data: any, dataType?: dataType, log?: boolean | undefined) => Promise<ISaveDataResponse | Error | undefined>;
export declare const getHostedAccount: (APP_ID: string, SECRET: string) => (coinType?: string, log?: boolean | undefined) => Promise<IGetHostedResponse | Error | undefined>;
export declare const hostedAccountBalance: (APP_ID: string, SECRET: string) => (coinType?: string, log?: boolean | undefined) => Promise<IGetBalanceResponse | Error | undefined>;
