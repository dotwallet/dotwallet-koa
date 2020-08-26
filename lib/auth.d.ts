import { Context, Next } from 'koa';
import { IAccessData, IUserData } from './types';
export declare const handleAuthResponse: (APP_ID: string, SECRET: string) => (ctx: Context, next: Next, redirectWithQueries?: string | undefined, log?: boolean | undefined) => Promise<{
    userData: IUserData;
    accessData: IAccessData;
} | undefined>;
export declare const refreshAccess: (APP_ID: string) => (refreshToken: string) => Promise<IAccessData | Error | undefined>;
