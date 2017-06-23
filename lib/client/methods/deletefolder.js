"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function (folderid) {
    (0, _invariant2.default)(typeof folderid === "number", "`folderid must be a number.`");
    (0, _invariant2.default)(folderid, "`folderid` is required and can't be `0`.");

    return client.api("deletefolderrecursive", { params: { folderid: folderid } }).then(function (response) {
      return true;
    });
  };
};