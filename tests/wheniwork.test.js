'use strict';

let WIW = require('../lib/wheniwork');

let key = process.env.WIWKEY;
let user = process.env.WIWUSER;
let pass = process.env.WIWPASS;

describe("WhenIWork", () => {
  let wiw;
  beforeEach(() => {
    wiw = new WIW(key, user, pass);
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
