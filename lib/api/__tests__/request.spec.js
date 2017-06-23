'use strict';

var _ApiRequest = require('../ApiRequest');

var _ApiRequest2 = _interopRequireDefault(_ApiRequest);

var _utils = require('../../../test/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mockReturnListfolder = { result: 0, metadata: { name: '/', folderid: 0, isfolder: true } };

describe('request', function () {
  it('sends two calls to the request, but network is called once', function () {
    var networkOp = jest.fn();
    (0, _utils.superMockery)(/url/, (0, _utils.mockResponse)(mockReturnListfolder), networkOp);

    var req1 = (0, _ApiRequest2.default)('https://hostname/url?param1=val1');
    var req2 = (0, _ApiRequest2.default)('https://hostname/url?param1=val1');

    Promise.all([req1, req2]).then(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = expect;
              _context.next = 3;
              return req1;

            case 3:
              _context.t1 = _context.sent;
              _context.t2 = mockReturnListfolder;
              (0, _context.t0)(_context.t1).toEqual(_context.t2);
              _context.t3 = expect;
              _context.next = 9;
              return req2;

            case 9:
              _context.t4 = _context.sent;
              _context.t5 = mockReturnListfolder;
              (0, _context.t3)(_context.t4).toEqual(_context.t5);


              expect(networkOp).toHaveBeenCalledTimes(1);
              expect(networkOp).toHaveBeenCalledWith({ param1: "val1" }, "https://hostname/url?param1=val1");

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));
  });
});