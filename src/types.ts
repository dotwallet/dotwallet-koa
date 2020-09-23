export interface IUserData {
  pay_status: number;
  pre_amount: number;
  total_amount: number;
  user_address: string;
  user_avatar: string;
  user_name: string;
  user_open_id: string;
}

export interface IAccessData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export interface IOrderData {
  app_id: string;
  merchant_order_sn: string;
  item_name: string;
  order_amount: number;
  nonce_str: string;
  notice_uri?: string;
  redirect_uri?: string;
  opreturn?: string;
  recieve_address?: string;
}

export interface IAutoPaymentOrder {
  app_id: string;
  merchant_order_sn: string;
  pre_amount: number;
  user_open_id: string;
  item_name: string;
  opreturn?: string;
  recieve_address?: string;
}

export interface IOrderResponseData {
  order_sn?: string;
  pay_txid?: string;
  paytxid?: string;
  txid?: string;
  rawtx?: string;
  error?: string | Error;
}

export interface IOrderStatusInfo {
  amount: number;
  create_time: string;
  fee: number;
  item_name: string;
  merchant_order_sn: string;
  order_sn: string;
  pay_time: string;
  pay_txid: string;
  receive_address: string;
  status: number;
  user_refund_address: string;
}
export enum dataType {
  string,
  bitcoinRawHex,
}

export interface IGetHostedResponse {
  address: string;
  coin_type: string;
}

export interface IGetBalanceResponse {
  confirm: number;
  unconfirm: number;
}

export interface ISaveDataResponse {
  fee: number;
  params: any;
  rawtx: string;
  txid: string;
}
