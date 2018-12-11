
import * as request from 'request-promise';
import * as BB from 'bluebird';
import * as _ from 'lodash';
import { WhenIWorkOptions } from './wheniwork-types';
import * as types from './wheniwork-types';

export * from './wheniwork-types';


export class WhenIWorkApi {
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

  constructor(apikey: string, username: string, password: string, options?:WhenIWorkOptions);
  constructor(apikey: string, token: string, userId: number, options?: WhenIWorkOptions);
  constructor(apikey: string, ...args) {
    let token: string, username: string, password: string, userId: number, options: WhenIWorkOptions;
    if (_.isString(args[0]) && _.isString(args[1])) {
      username = args[0];
      password = args[1];
      options = args[2];
    } else {
      token = args[0];
      userId = args[1];
      options = args[2];
    }

    options = _.assign({
      logRequests: false,
      logFn: console.log.bind(console),
      accountId: null
    }, options);

    this.key = apikey;
    this.username = username;
    this.password = password;
    this.accountId = options.accountId;

    this.base = 'https://api.wheniwork.com/2/';
    this.token = token;
    this.user;
    this.userId = userId;
    this.account;
    
    this.config = options;
    this.log = options.logFn;


    this.ready = this.login();
  }

  async _request (options, nolog = false): Promise<any> {
    options = _.merge({
      method: 'GET',
      headers: {
        'W-Token': this.token,
        'W-UserId': this.userId
      },
      json: true
    }, options);

    if (this.config.logRequests && !nolog) {
      this.log(options.method, options.uri, {qs: options.qs, body: options.body});
    }

    return request(options)
      .catch(err => {
        throw new WIWError(err);
      });
  }

  async request(options): Promise<any> {
    await this.ready;  
    return this._request(options);
  }

  async get(uri: 'shifts', query?: types.ListShiftParameters): Promise<types.ListShiftsResponse>;
  async get(uri: 'users', query?: types.ListUsersParameters): Promise<types.ListUsersResponse>;
  async get(uri: 'positions', query?: types.ListPositionsParameters): Promise<types.ListPositionsResponse>;
  async get(uri: 'locations', query?: types.ListLocationsParameters): Promise<types.ListLocationsResponse>;
  async get(uri: 'sites', query?: types.ListSitesParameters): Promise<types.ListSitesResponse>;
  async get(uri: 'times', query?: types.ListTimesParameters): Promise<types.ListTimesResponse>;
  async get(uri: 'timezones', query?: types.ListTimezonesParameters): Promise<types.ListTimezonesResponse>;
  async get(uri: 'blocks', query?: types.ListBlocksParameters): Promise<types.ListBlocksResponse>;
  async get(uri: 'requests', query?: types.ListRequestsParameters): Promise<types.ListRequestsResponse>;
  async get(uri: 'swaps', query?: types.ListSwapsParameters): Promise<types.ListSwapsResponse>;
  async get(uri: 'messages', query?: types.ListMessagesParameters): Promise<types.ListMessagesResponse>;
  async get(uri: 'templates', query?: types.ListTemplatesParameters): Promise<types.ListTemplatesResponse>;
  async get(uri: string, query?: {[key: string]: any}): Promise<any>;
  async get(uri: string, query?: {[key: string]: any}): Promise<any> {
    let options = {
      uri: this.base + uri,
      qs: query || undefined
    };
    return this.request(options);
  }

  async post(uri: string, body?: any): Promise<any> {
    let options = {
      uri: this.base + uri,
      method: 'POST',
      body: body
    };
    return this.request(options);
  }

  async put(uri: string, body?: any): Promise<any> {
    let options = {
      uri: this.base + uri,
      method: 'PUT',
      body: body
    };
    return this.request(options);
  }

  async delete(uri: string): Promise<any> {
    let options = {
      uri: this.base + uri,
      method: 'DELETE'
    };
    return this.request(options);
  }

  async login (): Promise<{user: types.User, account: types.Account}> {
    if (this.user && this.account) {
      return {user: this.user, account: this.account};
    }

    let req: any = {
      method: 'POST',
      uri: this.base + 'login'
    };
    if (this.token) {
      req.headers = {
        'W-Token': this.token
      };
    } else {
      req.body = {
        username: this.username,
        password: this.password,
        key: this.key
      };
    }
    let res = await this._request(req, true);
    
    this.token = res.login.token;
    
    if (res.user) {
      this.user = res.user;
      this.userId = this.user.id;
      this.account = res.account;
    } 
    else if (res.users && this.accountId) {
      for (let user of res.users) {
        if (user.account_id === this.accountId) {
          this.user = user;
          this.userId = user.id;
          this.token = user.token;
        }
      }
      for (let account of res.accounts) {
        if (account.id === this.accountId) {
          this.account = account;
        }
      }
    }
    if (!this.user) {
      throw new WIWError({
        statusCode: 400,
        error: {
          code: 'USER_ERROR',
          error: 'WhenIWork responded with multiple users but there was no matching `accountId` in options'
        }
      });
    }
    

    return {user: this.user, account: this.account};
  }
}
export let WIW = WhenIWorkApi;
export default WhenIWorkApi;

export class WIWError extends Error {
  status: number;
  code: string;
  message: string;

  constructor(err) {
    super(err);
    this.status = err.statusCode;
    this.code = err.error.code;
    this.message = `${this.code} - ${err.error.error}`;
  }

  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message
    };
  }
}
