"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function (fileid) {
    (0, _invariant2.default)(typeof fileid === "number", "`fileid` must be a number.");
    (0, _invariant2.default)(fileid, "`fileid` is required.");

    return client.api("deletefile", { params: { fileid: fileid } }).then(function () {
      return true;
    });
  };
};