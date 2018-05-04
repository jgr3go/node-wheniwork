"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const _ = require("lodash");
class WhenIWorkApi {
    constructor(apikey, ...args) {
        let token, username, password, options;
        if (_.isString(args[0]) && _.isString(args[1])) {
            username = args[0];
            password = args[1];
            options = args[2];
        }
        else {
            token = args[0];
            options = args[1];
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
        this.userId;
        this.account;
        this.config = options;
        this.log = options.logFn;
        this.error = options.errorFn;
        this.ready = this.login();
    }
    _request(options, nolog = false) {
        options = _.merge({
            method: 'GET',
            headers: {
                'W-Token': this.token,
                'W-UserId': this.userId
            },
            json: true
        }, options);
        if (this.config.logRequests && !nolog) {
            this.log(options.method, options.uri, { qs: options.qs, body: options.body });
        }
        return request(options)
            .catch(err => {
            throw new WIWError(err);
        });
    }
    request(options) {
        return this.ready
            .then(() => {
            return this._request(options);
        });
    }
    get(uri, query) {
        let options = {
            uri: this.base + uri,
            qs: query || undefined
        };
        return this.request(options);
    }
    post(uri, body) {
        let options = {
            uri: this.base + uri,
            method: 'POST',
            body: body
        };
        return this.request(options);
    }
    put(uri, body) {
        let options = {
            uri: this.base + uri,
            method: 'PUT',
            body: body
        };
        return this.request(options);
    }
    delete(uri) {
        let options = {
            uri: this.base + uri,
            method: 'DELETE'
        };
        return this.request(options);
    }
    login() {
        let req = {
            method: 'POST',
            uri: this.base + 'login'
        };
        if (this.token) {
            req.headers = {
                'W-Token': this.token
            };
        }
        else {
            req.body = {
                username: this.username,
                password: this.password,
                key: this.key
            };
        }
        return this._request(req, true)
            .then(res => {
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
        });
    }
}
exports.default = WhenIWorkApi;
class WIWError extends Error {
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
exports.WIWError = WIWError;
