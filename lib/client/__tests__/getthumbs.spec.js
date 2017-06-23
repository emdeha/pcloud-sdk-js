'use strict';

var _ApiMethod = require('../../api/ApiMethod');

var _ApiMethod2 = _interopRequireDefault(_ApiMethod);

var _createClient2 = require('../createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('../../api/ApiMethod');


var getThumbsSpy = jest.fn();
var receiveThumbSpy = jest.fn();

var image = 'data:image/jpeg;base64,/9j/4AAQSkZ';

var exampleResult = ["2412453536|0|32x32|" + image, "3|6001|0"];

(0, _ApiMethod.one)(function (method, _ref) {
  var params = _ref.params;
  return method === 'getthumbs';
}, (0, _ApiMethod.text)(exampleResult.join("\n") + "\n"), getThumbsSpy);

var _createClient = (0, _createClient3.default)('testauth', 'oauth', false),
    getthumbs = _createClient.getthumbs;

describe('getthumbs', function () {
  it('works correctly', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getthumbs([1, 2], receiveThumbSpy);

          case 2:
            response = _context.sent;


            expect(getThumbsSpy).toHaveBeenCalledTimes(1);

            expect(response[0].fileid).toBe(2412453536);
            expect(response[0].url).toBe(image);

            expect(response[1].fileid).toBe(3);
            expect(response[1].url).toBe(image);

            expect(_ApiMethod2.default.mock.calls.length).toBe(1);
            expect(_ApiMethod2.default.mock.calls[0][1].params).toEqual({
              access_token: "testauth",
              crop: 1,
              fileids: "1,2",
              size: "32x32",
              type: "auto"
            });

            expect(receiveThumbSpy).toHaveBeenCalledTimes(2);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});