'use strict';

var _createClient2 = require('../createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

var _utils = require('../../../test/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _createClient = (0, _createClient3.default)('testauth'),
    listfolder = _createClient.listfolder;

var mockReturnListfolder = {
  result: 0,
  metadata: {
    name: '/',
    folderid: 0,
    isfolder: true
  }
};

var mockReturnFolderNotFound = {
  "result": 2005,
  "error": "Directory does not exist."
};

describe('listfolder', function () {
  it('list the folder', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var query, response, _query, access_token, folderid;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnListfolder), function (q) {
              query = q;
            });

            _context.next = 3;
            return listfolder(0);

          case 3:
            response = _context.sent;

            expect(response.name).toBe('/');
            expect(response.folderid).toBe(0);
            expect(response.isfolder).toBe(true);

            _query = query, access_token = _query.access_token, folderid = _query.folderid;

            expect(access_token).toBe('testauth');
            expect(folderid).toBe("0");

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('on wrong folderid returns error 2005', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var query, response, _query2, access_token, folderid;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _utils.superMockery)(/listfolder/, (0, _utils.mockResponse)(mockReturnFolderNotFound), function (q) {
              query = q;
            });

            _context2.next = 3;
            return listfolder(1337).catch(function (e) {
              return e;
            });

          case 3:
            response = _context2.sent;


            expect(response.error).toBe('Directory does not exist.');
            expect(response.result).toBe(2005);

            _query2 = query, access_token = _query2.access_token, folderid = _query2.folderid;

            expect(access_token).toBe('testauth');
            expect(folderid).toBe("1337");

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});