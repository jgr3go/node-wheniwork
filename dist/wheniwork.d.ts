/// <reference types="bluebird" />
import * as BB from 'bluebird';
import { WhenIWorkOptions } from './wheniwork-types';
declare class WhenIWork {
    key: string;
    username: string;
    password: string;
    accountId: number;
    base: string;
    token: string;
    user: any;
    userId: number;
    account: any;
    config: WhenIWorkOptions;
    log: Function;
    error: Function;
    ready: any;
    constructor(apikey: string, token: string, options?: WhenIWorkOptions);
    constructor(apikey: string, username: string, password: string, options?: WhenIWorkOptions);
    _request(options: any, nolog?: boolean): BB<any>;
    request(options: any): any;
    get(uri: string, query?: {
        [key: string]: string;
    }): any;
    post(uri: string, body?: any): any;
    put(uri: string, body?: any): any;
    delete(uri: string): any;
    login(): BB<void>;
}
export = WhenIWork;
