'use strict';

let request = require('request-promise');
let BB = require('bluebird');
let _ = require('lodash');

class WhenIWork {
  constructor(apikey, username, password, options) {
    options = _.assign({
      logRequests: false,
      logFn: console.log.bind(console)
    }, options);

    this.key = apikey;
    this.username = username;
    this.password = password;

    this.base = 'https://api.wheniwork.com/2/';
    this.token;
    this.user;
    this.userId;
    this.account;
    
    this.config = options;
    this.log = options.logFn;
    this.error = options.errorFn;

    this.ready = this.login();
  }

  _request (options, nolog) {
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

  login () {
    return this._request({
      method: 'POST',
      uri: this.base + 'login', 
      body: {
        username: this.username,
        password: this.password,
        key: this.key
      }
    }, true)
    .then(res => {
      this.token = res.login.token;
      this.user = res.user;
      this.account = res.account;
      this.userId = this.user.id;
    });
  }
}

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

module.exports = WhenIWork;
