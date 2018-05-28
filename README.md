# node-wheniwork
node.js wrapper for WhenIWork APIs

Endpoints, arguments, and responses can be found on [WhenIWork's documentation](http://dev.wheniwork.com/). 

## Installation  

Install via npm  

```
npm install --save wheniwork
yarn add wheniwork
```

## Basic usage 

```
let WIW = require('wheniwork').WIW;

let wiw = new WIW(apiKey, username, password);

wiw.get('shifts', {
      start: new Date(2017, 03, 01),
      end: new Date(2017, 03, 05)
    })
    .then(res => {
      console.log(res.shifts);
    })
    .catch(err => {
      console.error(err);
    });
```

## HTTP Functions 

### wiw.get(uri, query)

* `uri` : endpoint exposed via WIW, e.g. `'shifts'`   
* `query` (optional) object containing query strings  

``` 
wiw.get('shifts', { start: new Date() })
   .then(res => { 
     ...
```

### wiw.post(uri, body)  

* `uri`: endpoint exposed via WIW, e.g. `'shifts'` 
* `body`: object to send in the POST body  

``` 
wiw.post('shifts', {"notes": "Do a thing"})
   .then(res => { 
     ...
```  

### wiw.put(uri, body)  

* `uri`: endpoint exposed via WIW, e.g. `'shifts/{id}'`  
* `body`: object to send in the PUT body  

```
wiw.put('shifts/15', {"notes": "Update my thing"})
   .then(res => { 
     ...
```

### wiw.delete(uri)

* `uri`: endpoint exposed via WIW, e.g. `'shifts/{id}`'

```
wiw.delete('shifts/15')
  .then(res => {  
     ...
```

### wiw.request(options)  

Generally not needed, as `get`, `post`, `put`, and `delete` should cover most requests, but if you need to pass other things in headers, might be useful

* `options`: [request](https://github.com/request/request) options, with defaults
* `options.method`: `'GET|POST|PUT|DELETE'` (default: `'GET'`)  
* `options.headers`: Object (default: `'W-Token'` and `'W-UserId'` are included)
* `options.qs`: Object of queries  
* `options.body`: Request body


## Options

```
let options = {
  logRequests: true,
  accountId: 12345
};
let wiw = new WIW(apikey, username, password, options);
```

#### `options.logRequests` (Default: `false`)

If you want to log the http requests made to WhenIWork, enable this option

#### `options.logFn` (Default: `console.log`)

Pass in a custom log function if you have your own logging class. 

#### `options.accountId` (Default: `null`)

If your login user has access to multiple accounts, you need to pass in an `accountId` to make sure all the requests are processed correctly. 

  

## Responses

### Success

Will return the JSON object that WIW returns from it's API.  See their [documentation](http://dev.wheniwork.com/) for that looks like. 

### Fail 

Returns a subclass of `Error` with the following useful properties  

* `err.status` HTTP Status Code
* `err.message` WIW Error Message
* `err.code` WIW Error Code

