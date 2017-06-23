"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiRequest = require("../../api/ApiRequest");

var _ApiRequest2 = _interopRequireDefault(_ApiRequest);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return function (filename) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function (url) {
      var _options$onBegin = options.onBegin,
          onBegin = _options$onBegin === undefined ? function () {} : _options$onBegin,
          _options$onProgress = options.onProgress,
          _onProgress = _options$onProgress === undefined ? function () {} : _options$onProgress,
          _options$onFinish = options.onFinish,
          onFinish = _options$onFinish === undefined ? function () {} : _options$onFinish;

      onBegin();
      return (0, _ApiRequest2.default)(url, {
        type: "arraybuffer",
        pipe: _fs2.default.createWriteStream(filename),
        onProgress: function onProgress(progress) {
          if (progress.direction === "download") {
            _onProgress(progress);
          }
        }
      }).then(function () {
        var file = {
          path: filename,
          name: _path2.default.basename(filename),
          size: _fs2.default.statSync(filename).size
        };

        onFinish(file);
        return file;
      });
    };
  };
};