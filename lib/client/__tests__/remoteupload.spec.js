'use strict';

var _ApiMethod = require('../../api/ApiMethod');

var _createClient2 = require('../createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('../../api/ApiMethod');

var _createClient = (0, _createClient3.default)('access_token'),
    remoteupload = _createClient.remoteupload;

var mockDownloadfileResponse = { metadata: [{ name: 'file.ext', size: 200 }] };
var mockUploadprogress = {
  finished: false, urlready: 0, result: 0, urlworking: 1, urlcount: 1,
  files: [{ downloaded: 150, size: 200, url: 'http://host/file.ext', status: 'downloading' }]
};

var downloadfileCalled = jest.fn();
var progressCalled = jest.fn();

(0, _ApiMethod.one)(function (method) {
  return method === 'downloadfile';
}, (0, _ApiMethod.success)(mockDownloadfileResponse), downloadfileCalled);
(0, _ApiMethod.one)(function (method) {
  return method === 'uploadprogress';
}, (0, _ApiMethod.success)(mockUploadprogress), progressCalled);

describe('remoteupload', function () {
  it('downloads file', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return remoteupload('http://host/file.ext', 0, {
              onProgress: function onProgress(progress) {
                expect(progress).toEqual({
                  all: { downloaded: 150, size: 200 },
                  files: [{
                    downloaded: 150,
                    size: 200,
                    url: 'http://host/file.ext',
                    status: 'downloading'
                  }]
                });
              }
            }).catch(function (e) {
              return e;
            });

          case 2:
            response = _context.sent;


            expect(response).toEqual({ "metadata": { "name": "file.ext", "size": 200 } });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});