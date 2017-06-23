'use strict';

var _ApiMethod = require('../../api/ApiMethod');

var _ApiMethod2 = _interopRequireDefault(_ApiMethod);

var _createClient2 = require('../createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('../../api/ApiMethod');

var _createClient = (0, _createClient3.default)('testauth'),
    createfolder = _createClient.createfolder;

var mockReturnCreatefolder = {
		"metadata": {
				"path": "/folder name",
				"name": "folder name",
				"created": "Fri, 13 Jan 2017 19:07:11 +0000",
				"ismine": true,
				"thumb": false,
				"modified": "Fri, 13 Jan 2017 19:07:11 +0000",
				"id": "d111155556666",
				"isshared": false,
				"icon": "folder",
				"isfolder": true,
				"parentfolderid": 0,
				"folderid": 111155556666
		}
};

var createdMock = jest.fn();
var alreadyExistsMock = jest.fn();

(0, _ApiMethod.one)(function (method, _ref) {
		var folderid = _ref.params.folderid;
		return method === 'createfolder' && folderid === 1;
}, (0, _ApiMethod.success)(mockReturnCreatefolder), createdMock);
(0, _ApiMethod.one)(function (method, _ref2) {
		var folderid = _ref2.params.folderid;
		return method === 'createfolder' && folderid === 1337;
}, (0, _ApiMethod.error)(2004, "File or folder already exists."), alreadyExistsMock);

describe('createfolder', function () {
		it('returns `metadata` when successful and has correct params', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var response;
				return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
								switch (_context.prev = _context.next) {
										case 0:
												_context.next = 2;
												return createfolder('folder name', 1);

										case 2:
												response = _context.sent;


												expect(response.name).toBe('folder name');
												expect(response.thumb).toBe(false);
												expect(response.isfolder).toBe(true);
												expect(response.folderid).toBe(111155556666);

												expect(createdMock).toHaveBeenCalledTimes(1);
												expect(_ApiMethod2.default.mock.calls[0][1].params).toEqual({ access_token: 'testauth', name: 'folder name', folderid: 1 });

										case 9:
										case 'end':
												return _context.stop();
								}
						}
				}, _callee, undefined);
		})));
});

describe('throws error false when unsuccessful', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
						switch (_context3.prev = _context3.next) {
								case 0:
										it('handles the error correctly', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
												var response;
												return regeneratorRuntime.wrap(function _callee2$(_context2) {
														while (1) {
																switch (_context2.prev = _context2.next) {
																		case 0:
																				_context2.next = 2;
																				return createfolder('folder name', 1337).catch(function (error) {
																						return error;
																				});

																		case 2:
																				response = _context2.sent;


																				expect(response.error).toBe('File or folder already exists.');
																				expect(response.result).toBe(2004);

																				expect(alreadyExistsMock).toHaveBeenCalledTimes(1);
																				expect(_ApiMethod2.default.mock.calls[1][1].params).toEqual({ access_token: 'testauth', name: 'folder name', folderid: 1337 });

																		case 7:
																		case 'end':
																				return _context2.stop();
																}
														}
												}, _callee2, undefined);
										})));

								case 1:
								case 'end':
										return _context3.stop();
						}
				}
		}, _callee3, undefined);
})));