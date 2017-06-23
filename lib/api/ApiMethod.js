"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ApiMethod;

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _utils = require("../utils");

var _ApiRequest = require("./ApiRequest");

var _ApiRequest2 = _interopRequireDefault(_ApiRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultApiServer = "api.pcloud.com";

function ApiMethod(method) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _options$apiServer = options.apiServer,
      apiServer = _options$apiServer === undefined ? defaultApiServer : _options$apiServer,
      _options$apiProtocol = options.apiProtocol,
      apiProtocol = _options$apiProtocol === undefined ? "https" : _options$apiProtocol,
      _options$params = options.params,
      params = _options$params === undefined ? {} : _options$params,
      requestParams = _objectWithoutProperties(options, ["apiServer", "apiProtocol", "params"]);

  (0, _invariant2.default)((0, _utils.isApiMethod)(method), "Method `" + method + "` is not pCloud API method.");

  (0, _invariant2.default)(!(0, _utils.isAuthMethod)(method) || "auth" in params || "access_token" in params || "username" in params, "`auth` must be present for methods that require authentication.");

  var requestUrl = _url2.default.format({
    protocol: apiProtocol,
    host: apiServer,
    pathname: method,
    query: params
  });

  if (requestParams.responseType === undefined) {
    requestParams.responseType = "json";
  }

  return (0, _ApiRequest2.default)(requestUrl, requestParams).then(function (response) {
    if (requestParams.responseType === "json") {
      if (response.result !== 0) {
        return Promise.reject(response);
      }
    }

    return response;
  });
}