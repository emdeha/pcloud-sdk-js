'use strict';

var _ApiMethod = require('../../api/ApiMethod');

var _ApiMethod2 = _interopRequireDefault(_ApiMethod);

var _createClient2 = require('../createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('../../api/ApiMethod');


var deleteSpy = jest.fn();
var fileNotFoundSpy = jest.fn();

(0, _ApiMethod.one)(function (method, _ref) {
  var folderid = _ref.params.folderid;
  return method === 'deletefolderrecursive' && folderid === 1;
}, (0, _ApiMethod.success)({}), deleteSpy);
(0, _ApiMethod.one)(function (method, _ref2) {
  var folderid = _ref2.params.folderid;
  return method === 'deletefolderrecursive' && folderid === 2;
}, (0, _ApiMethod.error)(2005, "Directory does not exist."), fileNotFoundSpy);

var _createClient = (0, _createClient3.default)('testauth', 'oauth', false),
    deletefolder = _createClient.deletefolder;

describe('deletefolder', function () {
  it('sends correct data for delete', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return deletefolder(1);

          case 2:
            response = _context.sent;


            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(response).toBe(true);

            expect(_ApiMethod2.default.mock.calls.length).toBe(1);
            expect(_ApiMethod2.default.mock.calls[0][1].params).toEqual({ folderid: 1, access_token: "testauth" });

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('handles error correctly', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return deletefolder(2).catch(function (e) {
              return e;
            });

          case 2:
            response = _context2.sent;


            expect(fileNotFoundSpy).toHaveBeenCalledTimes(1);
            expect(response).toEqual({ "error": "Directory does not exist.", "result": 2005 });

            expect(_ApiMethod2.default.mock.calls[1][1].params).toEqual({ access_token: 'testauth', folderid: 2 });

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});