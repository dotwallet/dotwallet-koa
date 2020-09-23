import { Context, Next } from 'koa';
import { IAccessData, IUserData, IOrderData, IOrderStatusInfo, IOrderResponseData, IAutoPaymentOrder, dataType, IGetHostedResponse, IGetBalanceResponse, ISaveDataResponse } from './types';
declare class DotWallet {
    APP_ID: string;
    SECRET: string;
    /** @param redirectWithQueries If you'd like to have express send the response to redirect to a url, carrying the user data queries with it, than include a redirect URL string here
     * @param log whether to log events
     * @example app.get('/auth', Dotwallet.handleAuthResponse('/frontend-landing-page', true)); app.get('/auth', dotwallet.handleAuthResponse().then(result=>{const userData = result.userData; const accessToken = result.accessData.access_token;}));
     * @returns {object} { userData: {user_open_id, ...}, accessData:{ refresh_token, expires_in, access_token }}
     */
    handleAuthResponse: (ctx: Context, next: Next, redirectWithQueries?: string | undefined, log?: boolean | undefined) => Promise<{
        userData: IUserData;
        accessData: IAccessData;
    } | undefined>;
    /**
     * @summary Use your refresh token to get back an access token and a new refresh token
     * @param { string } refreshToken
     * @returns { object|Error } { refresh_token, expires_in, access_token }
     */
    refreshAccess: (refreshToken: string) => Promise<IAccessData | Error | undefined>;
    /**
     * @summary sign an order with your deveoper key, and send it to dotwallet servers to get an order_sn
     * @param { IOrderData } orderData a valid order as a js object (see the docs or this IorderData type)
     * @returns { string } the order_sn
     */
    handleOrder: (orderData: IOrderData, log?: boolean | undefined) => Promise<string | Error | undefined>;
    getOrderStatus: (merchant_order_sn: string) => Promise<IOrderStatusInfo | Error | undefined>;
    /**
     * @summary Send out a payment on behalf of a wallet that has authorized auto-payments
     * @param { IAutoPaymentOrder } orderData a valid order as a js object (see the docs or this IAutoPaymentOrder type)
     * @param { string } redirect must be a valid http or https url string. if supplied, will redirect the user to the initialize micropayments screen when their balance is too low. Afterwards the user will be redirected to the supplied url
     * @returns { IOrderResponseData } The order
     */
    autopayment: (ctx: Context, orderData: IAutoPaymentOrder, redirect?: string | undefined, log?: boolean | undefined) => Promise<IOrderResponseData | Error | undefined>;
    getHostedAccount: (coinType?: string, log?: boolean | undefined) => Promise<IGetHostedResponse | Error | undefined>;
    hostedAccountBalance: (coinType?: string, log?: boolean | undefined) => Promise<IGetBalanceResponse | Error | undefined>;
    /**
     * @param {dataType} dataType 0 for string and 1 for rawhex. If you select 0 (the default) we will JSON.stringify() the data to be saved on chain
     * @param {string|object} data JSON.stringify-able data if default, or rawhex string if rawhex
     */
    saveData: (data: any, dataType?: dataType, log?: boolean | undefined) => Promise<ISaveDataResponse | Error | undefined>;
    constructor(appId: string, secret: string);
}
declare const caller: (appId: string, secret: string) => DotWallet;
export = caller;
