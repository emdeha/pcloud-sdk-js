"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createClient;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _deepAssign = require("deep-assign");

var _deepAssign2 = _interopRequireDefault(_deepAssign);

var _ApiMethod = require("../api/ApiMethod");

var _ApiMethod2 = _interopRequireDefault(_ApiMethod);

var _methods = require("./methods");

var methods = _interopRequireWildcard(_methods);

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultApiServer = "api.pcloud.com";

function createClient(token) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "oauth";
  var useProxy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  (0, _invariant2.default)(["oauth", "pcloud"].indexOf(type) !== -1, "`type` must be either `oauth` or `pcloud`.");

  if (type === "oauth") {
    (0, _invariant2.default)(typeof token === "string", "`token` is required.");
    (0, _invariant2.default)(token.length, "`token` is required.");
  }

  // Local Params
  // apiServer, token, type
  var apiServer = defaultApiServer;

  function initialOptions(method) {
    var options = { apiServer: apiServer, params: {} };

    if ((0, _utils.isAuthMethod)(method) && token) {
      options.params["oauth" === type ? "access_token" : "auth"] = token;
    }

    return options;
  }

  function api(method) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var mergeOptions = (0, _deepAssign2.default)({}, initialOptions(method), options);

    return (0, _ApiMethod2.default)(method, mergeOptions).catch(function (error) {
      if (error.result === 500 && apiServer !== defaultApiServer) {
        // reset API server
        apiServer = defaultApiServer;

        // retry
        return api(method, options);
      } else {
        return Promise.reject(error);
      }
    });
  }

  function setupProxy() {
    return api("getapiserver", {}).then(function (response) {
      return apiServer = response.api[0];
    });
  }

  function setToken(newToken) {
    token = newToken;
  }

  // client api for end users
  var client = { api: api, setupProxy: setupProxy };

  var pcloudMethod = void 0;

  for (var method in methods) {
    if (methods.hasOwnProperty(method)) {
      var baseMethod = methods[method];

      pcloudMethod = baseMethod({ client: client, setToken: setToken, type: type }, type);

      if (typeof pcloudMethod === "function") {
        client[method] = pcloudMethod;
      }
    }
  }

  if (useProxy) {
    setupProxy();
  }

  return client;
}