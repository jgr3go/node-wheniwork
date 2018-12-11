import { WhenIWorkOptions } from './wheniwork-types';
import * as types from './wheniwork-types';
export * from './wheniwork-types';
export declare class WhenIWorkApi {
    key: string;
    username: string;
    password: string;
    accountId: number;
    base: string;
    token: string;
    user: types.User;
    userId: number;
    account: types.Account;
    config: WhenIWorkOptions;
    log: Function;
    error: Function;
    ready: any;
    constructor(apikey: string, username: string, password: string, options?: WhenIWorkOptions);
    constructor(apikey: string, token: string, userId: number, options?: WhenIWorkOptions);
    _request(options: any, nolog?: boolean): Promise<any>;
    request(options: any): Promise<any>;
    get(uri: 'shifts', query?: types.ListShiftParameters): Promise<types.ListShiftsResponse>;
    get(uri: 'users', query?: types.ListUsersParameters): Promise<types.ListUsersResponse>;
    get(uri: 'positions', query?: types.ListPositionsParameters): Promise<types.ListPositionsResponse>;
    get(uri: 'locations', query?: types.ListLocationsParameters): Promise<types.ListLocationsResponse>;
    get(uri: 'sites', query?: types.ListSitesParameters): Promise<types.ListSitesResponse>;
    get(uri: 'times', query?: types.ListTimesParameters): Promise<types.ListTimesResponse>;
    get(uri: 'timezones', query?: types.ListTimezonesParameters): Promise<types.ListTimezonesResponse>;
    get(uri: 'blocks', query?: types.ListBlocksParameters): Promise<types.ListBlocksResponse>;
    get(uri: 'requests', query?: types.ListRequestsParameters): Promise<types.ListRequestsResponse>;
    get(uri: 'swaps', query?: types.ListSwapsParameters): Promise<types.ListSwapsResponse>;
    get(uri: 'messages', query?: types.ListMessagesParameters): Promise<types.ListMessagesResponse>;
    get(uri: 'templates', query?: types.ListTemplatesParameters): Promise<types.ListTemplatesResponse>;
    get(uri: string, query?: {
        [key: string]: any;
    }): Promise<any>;
    post(uri: string, body?: any): Promise<any>;
    put(uri: string, body?: any): Promise<any>;
    delete(uri: string): Promise<any>;
    login(): Promise<{
        user: types.User;
        account: types.Account;
    }>;
}
export declare let WIW: typeof WhenIWorkApi;
export default WhenIWorkApi;
export declare class WIWError extends Error {
    status: number;
    code: string;
    message: string;
    constructor(err: any);
    toJSON(): {
        status: number;
        code: string;
        message: string;
    };
}
