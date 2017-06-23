"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _thumbs = require("../../utils/thumbs");

var _thumbs2 = _interopRequireDefault(_thumbs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function (fileids, receiveThumb) {
    var thumbType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "auto";
    var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "32x32";

    (0, _invariant2.default)((typeof fileids === "undefined" ? "undefined" : _typeof(fileids)) === "object" && "length" in fileids && fileids.length, '`fileids` is required, must be array of numbers.');
    (0, _invariant2.default)(['auto', 'png', 'jpg'].indexOf(thumbType) !== 1, 'thumbType must be one of: "auto", "png", "jpg".');
    (0, _invariant2.default)(['32x32', '120x120'].indexOf(size) !== 1, 'size must be one of: "32x32", "120x120".');
    (0, _invariant2.default)(receiveThumb, "`receiveThumb` is required.");
    (0, _invariant2.default)(typeof receiveThumb === 'function', "`receiveThumb` must be a function.");

    var thumbs = [];
    var parser = (0, _thumbs2.default)();

    return client.api("getthumbs", {
      responseType: "text",
      params: {
        fileids: fileids.join(","),
        type: thumbType,
        size: size,
        crop: 1
      },
      onProgress: function onProgress(progress) {
        var progressThumbs = parser(progress.currentTarget.responseText);
        thumbs = thumbs.concat(progressThumbs);
        progressThumbs.forEach(receiveThumb);
      }
    }).then(function (response) {
      var responseThumbs = parser(response);
      responseThumbs.forEach(receiveThumb);
      return thumbs.concat(responseThumbs);
    });
  };
};