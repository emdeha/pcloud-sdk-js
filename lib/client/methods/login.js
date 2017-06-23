"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client,
      setToken = _ref.setToken;
  return function (email, password) {
    (0, _invariant2.default)(typeof email === "string" && (0, _utils.isEmail)(email), "`email` must be provided.");
    (0, _invariant2.default)(password, "`password` is required.");
    (0, _invariant2.default)(password.length, "`password` is required.");

    return client.api("userinfo", {
      params: { username: email, password: password, getauth: 1, logout: 1 }
    }).then(function (_ref2) {
      var auth = _ref2.auth;

      setToken(auth);
      return auth;
    });
  };
};