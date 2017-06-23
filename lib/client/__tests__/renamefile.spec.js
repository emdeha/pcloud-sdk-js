'use strict';

var _createClient2 = require('../createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

var _utils = require('../../../test/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _createClient = (0, _createClient3.default)('testauth'),
    renamefile = _createClient.renamefile;

var mockReturnRenamefolder = { result: 0, metadata: { name: 'new name', isfolder: false, fileid: 100 } };

describe('renamefolder', function () {
  it('works correctly', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var query, response, _query, access_token, fileid, toname;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _utils.superMockery)(/renamefile/, (0, _utils.mockResponse)(mockReturnRenamefolder), function (q) {
              query = q;
            });

            _context.next = 3;
            return renamefile(100, 'new filename');

          case 3:
            response = _context.sent;

            expect(response.name).toBe('new name');
            expect(response.fileid).toBe(100);
            expect(response.isfolder).toBe(false);

            _query = query, access_token = _query.access_token, fileid = _query.fileid, toname = _query.toname;

            expect(access_token).toBe('testauth');
            expect(fileid).toBe("100");
            expect(toname).toBe('new filename');

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('throws on missing name', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var error;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            error = void 0;
            _context2.prev = 1;
            _context2.next = 4;
            return renamefile(232232323);

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](1);
            error = _context2.t0;

          case 9:
            expect(error.toString()).toBe('Invariant Violation: `toname` is required.');

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 6]]);
  })));

  it('throws on missing id', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var error;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            error = void 0;
            _context3.prev = 1;
            _context3.next = 4;
            return renamefile();

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](1);
            error = _context3.t0;

          case 9:
            expect(error.toString()).toBe('Invariant Violation: `fileid` must be number.');

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  })));
});