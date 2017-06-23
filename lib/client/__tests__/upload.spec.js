"use strict";

var _createClient2 = require("../createClient");

var _createClient3 = _interopRequireDefault(_createClient2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _utils = require("../../../test/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mockReturnUploadFile = {
	"result": 0,
	"metadata": [{
		"name": "image.jpg",
		"thumb": true,
		"isfolder": false,
		"fileid": 1993980510,
		"hash": 10257795101980746380,
		"category": 4,
		"id": "f1993980510",
		"isshared": false,
		"ismine": true,
		"size": 2384712,
		"parentfolderid": 378855472,
		"icon": "image"
	}],
	"checksums": [{
		"sha1": "b13677bfd33856de6a6e0d9d9d15223d3016f254",
		"md5": "ea7965e4a1b362faad53deda49a5d1f6"
	}],
	"fileids": [1993980510]
};

describe("upload trough api", function () {
	it("correcty uploads the file", _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
		var _createClient, upload, query, result;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_createClient = (0, _createClient3.default)("token"), upload = _createClient.upload;

						(0, _utils.superMockery)(/uploadfile/, (0, _utils.mockResponse)(mockReturnUploadFile), function (q) {
							query = q;
						}, 'post');

						_context.next = 4;
						return upload(_path2.default.resolve(__dirname, "../../../examples/node/files/image.jpg"), 1337);

					case 4:
						result = _context.sent;


						expect(result.metadata.name).toBe('image.jpg');
						expect(result.metadata.size).toBe(2384712);
						expect(result.checksums.sha1).toBe("b13677bfd33856de6a6e0d9d9d15223d3016f254");

						expect(query.access_token).toBe('token');
						expect(parseInt(query.folderid, 10)).toEqual(1337);
						expect(parseInt(query.nopartial, 10)).toBe(1);

					case 11:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined);
	})));
});