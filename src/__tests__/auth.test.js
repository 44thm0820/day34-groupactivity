'use strict';

const bearerMiddleware = require('../app/middleware/bearer');
const aclMiddleware = require('../app/middleware/acl');

describe('Testing our auth middleware', () => {
  test('Bearer middleware can authenticated using a token on the request', async () => {

    let token = null; // create a valid token with your user model or jwt library, user must be in db.

    const req = { token }
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    };
    const next = jest.fn();

    bearerMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Access control should allow request to go through with a valid token', async () => {

    

    let token = null; // create a valid token with your user model or jwt library, user must be in db.

    const req = { user: { capabilities: ['create'] } };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    };
    const next = jest.fn();

    // console.log(aclMiddleware('create'));
    aclMiddleware('create')(req, res, next);
    expect(next).toHaveBeenCalled();
    aclMiddleware('read')(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});


