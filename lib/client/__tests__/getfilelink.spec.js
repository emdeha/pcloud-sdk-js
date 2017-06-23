"use strict";

var _createClient2 = require("../createClient");

var _createClient3 = _interopRequireDefault(_createClient2);

var _utils = require("../../../test/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mockReturnDownloadFile = {
	"result": 0,
	"hash": 555544443333,
	"size": 1234566,
	"expires": "Fri, 13 Jan 2017 20:59:00 +0000",
	"path": "/path-to/file.jpg",
	"hosts": ["p-sf1.pcloud.com", "p-ams2.pcloud.com"]
};

describe("getfilelink api", function () {
	it("correctly get the url", _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
		var _createClient, getfilelink, query, result;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_createClient = (0, _createClient3.default)("token"), getfilelink = _createClient.getfilelink;

						(0, _utils.superMockery)(/getfilelink/, (0, _utils.mockResponse)(mockReturnDownloadFile), function (q) {
							query = q;
						});

						_context.next = 4;
						return getfilelink(1337).catch(function (e) {
							return e;
						});

					case 4:
						result = _context.sent;


						expect(result).toBe('https://p-sf1.pcloud.com/path-to/file.jpg');

						expect(query.access_token).toBe('token');
						expect(parseInt(query.fileid, 10)).toEqual(1337);
						expect(parseInt(query.forcedownload, 10)).toBe(1);

					case 9:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined);
	})));
});