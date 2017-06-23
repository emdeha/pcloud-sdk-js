'use strict';

var _ApiMethod = require('../../api/ApiMethod');

var _ApiMethod2 = _interopRequireDefault(_ApiMethod);

var _createClient2 = require('../createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('../../api/ApiMethod');

var _createClient = (0, _createClient3.default)(false, 'pcloud'),
    login = _createClient.login,
    listfolder = _createClient.listfolder;

var mockReturnUserinfo = { auth: 'acccess_token_string' };
var mockListfolder = { metadata: { name: "/", folderid: 0, isfolder: true, contents: [] } };

var loginCalled = jest.fn();
var listfolderCalled = jest.fn();

(0, _ApiMethod.one)(function (method, _ref) {
  var params = _ref.params;
  return method === 'userinfo' && params.getauth === 1;
}, (0, _ApiMethod.success)(mockReturnUserinfo), loginCalled);
(0, _ApiMethod.one)(function (method) {
  return method === 'listfolder';
}, (0, _ApiMethod.success)(mockListfolder), listfolderCalled);

describe('login', function () {
  it('gets auth from api and saves it for future calls', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var response, folder;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return login('mail@mail.com', 'password').catch(function (e) {
              return e;
            });

          case 2:
            response = _context.sent;


            expect(response).toBe("acccess_token_string");

            expect(_ApiMethod2.default).toHaveBeenCalledTimes(1);
            expect(_ApiMethod2.default).toHaveBeenCalledWith("userinfo", {
              apiServer: "api.pcloud.com",
              params: {
                getauth: 1,
                logout: 1,
                password: "password",
                username: "mail@mail.com"
              }
            });

            _context.next = 8;
            return listfolder(0);

          case 8:
            folder = _context.sent;


            expect(folder.name).toBe("/");
            expect(folder.folderid).toBe(0);

            expect(listfolderCalled).toHaveBeenCalledTimes(1);
            expect(listfolderCalled).toHaveBeenCalledWith("listfolder", {
              "apiServer": "api.pcloud.com",
              "params": {
                "auth": "acccess_token_string",
                "folderid": 0
              }
            });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});