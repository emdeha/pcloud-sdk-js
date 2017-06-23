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
  return function (email, password) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    (0, _invariant2.default)(typeof email === "string" && (0, _utils.isEmail)(email), "`email` must be provided.");
    (0, _invariant2.default)(password, "`password` is required.");
    (0, _invariant2.default)(password.length, "`password` is required.");

    var params = {
      mail: email,
      password: password,
      getauth: 1,
      logout: 1,
      termsaccepted: "yes"
    };

    if (options.invite) {
      params.invite = options.invite;
    }

    if (options.ref) {
      params.ref = options.ref;
    }

    if (ENV === "web") {
      params.os = 4;
      params.device = navigator.userAgent;
    }

    return client.api("register", { params: params }).then(function (response) {
      return response.userid;
    });
  };
};