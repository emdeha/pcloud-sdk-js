"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function (file) {
    var folderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    (0, _invariant2.default)(file, "`file` is required.");
    (0, _invariant2.default)(typeof file === "string", "`file` must be supplied");
    (0, _invariant2.default)(require("fs").existsSync(file), "File: " + file + " is not accessible.");

    var _options$onBegin = options.onBegin,
        onBegin = _options$onBegin === undefined ? function () {} : _options$onBegin,
        _options$onProgress = options.onProgress,
        _onProgress = _options$onProgress === undefined ? function () {} : _options$onProgress,
        _options$onFinish = options.onFinish,
        onFinish = _options$onFinish === undefined ? function () {} : _options$onFinish;

    onBegin();
    return client.api("uploadfile", {
      method: "post",
      params: { folderid: folderid, nopartial: 1 },
      files: [{ file: file, name: file.split("/").pop() }],
      onProgress: function onProgress(progress) {
        if (progress.direction === 'upload') {
          _onProgress(progress);
        }
      }
    }).then(function (response) {
      var ret = apiResponseToReturn(response);

      onFinish(ret);
      return ret;
    });
  };
};

function apiResponseToReturn(_ref2) {
  var metadata = _ref2.metadata,
      checksums = _ref2.checksums;

  return { metadata: metadata[0], checksums: checksums[0] };
}