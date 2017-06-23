"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function (file) {
    var folderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    (0, _invariant2.default)(file, "`file` is required.");
    (0, _invariant2.default)((typeof file === "undefined" ? "undefined" : _typeof(file)) === "object", "`file` of type File must be supplied.");

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
      files: [{ file: file, name: file.name }],
      onProgress: function onProgress(progress) {
        if (progress.direction === "upload") {
          _onProgress(progress);
        }
      }
    }).then(function (_ref2) {
      var metadata = _ref2.metadata,
          checksums = _ref2.checksums;

      var response = { metadata: metadata[0], checksums: checksums[0] };

      onFinish(response);
      return response;
    });
  };
};