/// <reference types="bluebird" />
import * as BB from 'bluebird';
import { WhenIWorkOptions } from './wheniwork-types';
import * as types from './wheniwork-types';
declare class WhenIWork {
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
    constructor(apikey: string, token: string, options?: WhenIWorkOptions);
    constructor(apikey: string, username: string, password: string, options?: WhenIWorkOptions);
    _request(options: any, nolog?: boolean): BB<any>;
    request(options: any): any;
    get(uri: 'shifts', query: types.ListShiftParameters): Promise<types.ListShiftsResponse>;
    get(uri: 'users', query: types.ListUsersParameters): Promise<types.ListUsersResponse>;
    get(uri: 'positions', query: types.ListPositionsParameters): Promise<types.ListPositionsResponse>;
    get(uri: 'locations', query: types.ListLocationsParameters): Promise<types.ListLocationsResponse>;
    get(uri: 'sites', query: types.ListSitesParameters): Promise<types.ListSitesResponse>;
    post(uri: string, body?: any): any;
    put(uri: string, body?: any): any;
    delete(uri: string): any;
    login(): BB<void>;
}
export = WhenIWork;
