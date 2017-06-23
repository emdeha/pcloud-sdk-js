'use strict';

var _ApiMethod = require('../../api/ApiMethod');

var _ApiMethod2 = _interopRequireDefault(_ApiMethod);

var _createClient2 = require('../createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('../../api/ApiMethod');


var gotProxyServer = jest.fn();
var receivedNetworkError = jest.fn();
var retried = jest.fn();

(0, _ApiMethod.one)(function (method) {
  return method === 'getapiserver';
}, (0, _ApiMethod.success)({ "api": ["broken-api.pcloud.com"] }), gotProxyServer);
(0, _ApiMethod.on)(function (method, options) {
  return options.apiServer === 'broken-api.pcloud.com';
}, (0, _ApiMethod.error)(500, "Network Error."), receivedNetworkError);
(0, _ApiMethod.on)(function (method, options) {
  return method === 'listfolder' && options.apiServer === 'api.pcloud.com';
}, (0, _ApiMethod.success)({ metadata: { name: "/", folderid: 0 } }), retried);

var _createClient = (0, _createClient3.default)('testauth', 'oauth', false),
    listfolder = _createClient.listfolder,
    setupProxy = _createClient.setupProxy;

beforeAll(function (done) {
  return setupProxy().then(done);
});

describe('client, proxy', function () {
  it('sets proxy, recovers on http error and retries the call', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return listfolder(0);

          case 2:
            response = _context.sent;


            expect(gotProxyServer).toHaveBeenCalledTimes(1);
            expect(receivedNetworkError).toHaveBeenCalledTimes(1);
            expect(retried).toHaveBeenCalledTimes(1);

            expect(response.folderid).toBe(0);
            expect(response.name).toBe("/");

            expect(_ApiMethod2.default.mock.calls.length).toBe(3);

            expect(_ApiMethod2.default.mock.calls[0][0]).toBe('getapiserver');
            expect(_ApiMethod2.default.mock.calls[0][1].apiServer).toBe('api.pcloud.com');
            expect(_ApiMethod2.default.mock.calls[0][1].params).toEqual({});

            expect(_ApiMethod2.default.mock.calls[1][0]).toBe('listfolder');
            expect(_ApiMethod2.default.mock.calls[1][1].apiServer).toBe('broken-api.pcloud.com');
            expect(_ApiMethod2.default.mock.calls[1][1].params).toEqual({ "access_token": "testauth", "folderid": 0 });

            expect(_ApiMethod2.default.mock.calls[2][0]).toBe('listfolder');
            expect(_ApiMethod2.default.mock.calls[2][1].apiServer).toBe('api.pcloud.com');
            expect(_ApiMethod2.default.mock.calls[2][1].params).toEqual({ "access_token": "testauth", "folderid": 0 });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});