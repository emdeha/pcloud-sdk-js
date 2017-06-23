"use strict";

var _ApiMethod = require("../ApiMethod");

var _ApiMethod2 = _interopRequireDefault(_ApiMethod);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _utils = require("../../../test/utils");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe("upload trough api", function () {
  it("correcty uploads the file", _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var server;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            server = _http2.default.createServer(function (req, res) {
              (0, _utils.receiveMultipart)(req, res);
              server.close();
            }).listen(4545, _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var result;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _ApiMethod2.default)("uploadfile", {
                        params: { auth: "auth_token", folderid: 0 },
                        httpMethod: "post",
                        apiServer: "127.0.0.1:4545",
                        apiProtocol: "http",
                        method: "post",
                        files: [{
                          name: "image",
                          file: _path2.default.resolve(__dirname, "../../../examples/node/files/image.jpg")
                        }]
                      });

                    case 2:
                      result = _context.sent;


                      expect(result.files.length).toBe(1);
                      expect(result.files[0].size).toBe(3129022);
                      expect(result.files[0].originalFilename).toBe("image.jpg");

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            })));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});