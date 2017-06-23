"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function (urls) {
    var folderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    (0, _invariant2.default)(urls, "`file` is required.");
    (0, _invariant2.default)(typeof urls === "string", "`file` must be supplied");

    var _options$onBegin = options.onBegin,
        onBegin = _options$onBegin === undefined ? function () {} : _options$onBegin,
        _options$onProgress = options.onProgress,
        onProgress = _options$onProgress === undefined ? function () {} : _options$onProgress,
        _options$onFinish = options.onFinish,
        onFinish = _options$onFinish === undefined ? function () {} : _options$onFinish;

    var progressId = "pcloud-sdk-remote-" + (0, _utils.uniqueNumber)() + "-" + (0, _utils.randomNumber)();
    var progressTimeout;

    function progress() {
      pollProgress();
      progressTimeout = setTimeout(progress, 200);
    }

    function stopProgress() {
      if (progressTimeout) {
        clearTimeout(progressTimeout);
      }
    }

    function pollProgress() {
      client.api("uploadprogress", { params: { progresshash: progressId } }).then(function (_ref2) {
        var files = _ref2.files;
        return onProgress(calculateProgress(files));
      });
    }

    onBegin();
    progress();
    return client.api("downloadfile", {
      method: "post",
      params: {
        folderid: folderid,
        progresshash: progressId,
        nopartial: 1,
        url: urls
      }
    }).then(function (_ref3) {
      var metadata = _ref3.metadata;

      stopProgress();

      onFinish({ metadata: metadata[0] });
      return { metadata: metadata[0] };
    });
  };
};

function calculateProgress(files) {
  return {
    all: {
      downloaded: files.reduce(function (n, file) {
        return n + file.downloaded;
      }, 0),
      size: files.reduce(function (n, file) {
        return n + file.size;
      }, 0)
    },
    files: files
  };
}