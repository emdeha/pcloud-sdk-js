'use strict';

var _ApiMethod = require('../../api/ApiMethod');

var _ApiMethod2 = _interopRequireDefault(_ApiMethod);

var _createClient2 = require('../createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('../../api/ApiMethod');

var _createClient = (0, _createClient3.default)('access_token'),
    userinfo = _createClient.userinfo;

var mockReturnUserinfo = {
  "emailverified": true,
  "userid": 100,
  "usedquota": 10041806938,
  "quota": 11811160064,
  "result": 0,
  "premium": false,
  "publiclinkquota": 53687091200,
  "language": "en",
  "email": "user@mail.com",
  "registered": "Tue, 01 Oct 2013 17:50:23 +0000"
};

var userinfoCalled = jest.fn();

(0, _ApiMethod.one)(function (method) {
  return method === 'userinfo';
}, (0, _ApiMethod.success)(mockReturnUserinfo), userinfoCalled);

describe('userinfo', function () {
  it('handles correct result', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return userinfo().catch(function (e) {
              return e;
            });

          case 2:
            response = _context.sent;


            expect(response.userid).toBe(100);
            expect(response.usedquota).toBe(10041806938);
            expect(response.quota).toBe(11811160064);

            expect(_ApiMethod2.default).toHaveBeenCalledTimes(1);
            expect(_ApiMethod2.default).toHaveBeenCalledWith("userinfo", {
              "apiServer": "api.pcloud.com",
              "params": { "access_token": "access_token" }
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});