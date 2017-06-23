"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _ApiMethod = require("../api/ApiMethod");

var _ApiMethod2 = _interopRequireDefault(_ApiMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var protocol = "https";

var host = "my.pcloud.com";
var path = "/oauth2/authorize";

function initOauthToken(options) {
  var _options$client_id = options.client_id,
      client_id = _options$client_id === undefined ? false : _options$client_id,
      _options$redirect_uri = options.redirect_uri,
      redirect_uri = _options$redirect_uri === undefined ? false : _options$redirect_uri,
      _options$receiveToken = options.receiveToken,
      receiveToken = _options$receiveToken === undefined ? false : _options$receiveToken;


  (0, _invariant2.default)(client_id, "`client_id` is required.");
  (0, _invariant2.default)(redirect_uri, "`redirect_uri` is required.");
  (0, _invariant2.default)(receiveToken, "`receiveToken` is required.");

  var oauthUrl = _url2.default.format({
    protocol: protocol,
    hostname: host,
    pathname: path,
    query: {
      redirect_uri: redirect_uri,
      client_id: client_id,
      response_type: "token"
    }
  });

  window.open(oauthUrl, "oauth", "width=680,height=535");
  window.__setPcloudToken = function (token) {
    receiveToken(token);
    delete window.__setPcloudToken;
  };
}

function popup() {
  var token = location.hash.match(/access_token=([^&]+)/)[1];
  window.opener.__setPcloudToken(token);
  window.close();
}

function getTokenFromCode(code, client_id, app_secret) {
  return (0, _ApiMethod2.default)("oauth2_token", {
    params: { client_id: client_id, client_secret: app_secret, code: code }
  });
};

exports.default = { initOauthToken: initOauthToken, popup: popup, getTokenFromCode: getTokenFromCode };