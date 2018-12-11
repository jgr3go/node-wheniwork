'use strict';

let WIW = require('../dist/wheniwork').WhenIWorkApi;

let key = process.env.WIWKEY;
let user = process.env.WIWUSER;
let pass = process.env.WIWPASS;
let accountId = parseInt(process.env.WIWACCOUNT);


describe("WhenIWork", () => {
  let wiw;
  beforeEach(() => {
    wiw = new WIW(key, user, pass, {accountId});
  });

  describe('basic', () => {

    test('require properly', () => {
      let wiw = require('../dist/wheniwork');
      expect(wiw.WhenIWorkApi).toBeDefined();
      expect(wiw.WIW).toBeDefined();
    });

    test('initialization works', () => {
      return wiw.ready
        .then(() => {
          expect(wiw.token).not.toBeUndefined();
          expect(wiw.userId).not.toBeUndefined();
        });
    });

    test('GET', () => {
      return wiw.get('shifts')
        .then(res => {
          expect(res.shifts.length).toBeDefined();
        });
    });

    test('invalid credentials', () => {
      wiw = new WIW('fake', 'fake', 'fake');

      return wiw.ready
        .then(() => {
          expect(true).toEqual(false);
        })
        .catch(err => {
          expect(err.status).toEqual(401);
        });
    });

    

  });

  describe('logging', () => {
    let origCLog;
    let myCLog;

    beforeEach(() => {
      origCLog = console.log;

      myCLog = jest.fn();

      console.log = myCLog;
    });


    test('log to console', () => {
      wiw = new WIW(key, user, pass, {
        accountId,
        logRequests: true
      });
      return wiw.get('shifts')
        .then(res => {
          expect(myCLog.mock.calls.length).toBe(1);
        });
    });

    test('log to custom', () => {
      let logger = {
        one: jest.fn(),
        two: jest.fn()
      };

      wiw = new WIW(key, user, pass, {
        accountId,
        logRequests: true,
        logFn: logger.one.bind(logger)
      });

      return wiw.get('shifts')
        .then(res => {
          expect(myCLog.mock.calls.length).toBe(0);
          expect(logger.one.mock.calls.length).toBe(1);
        });
    });


    afterEach(() => {
      console.log = origCLog;
    });

  });
});
