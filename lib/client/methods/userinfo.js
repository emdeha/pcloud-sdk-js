'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var client = _ref.client;
  return function () {

    return client.api('userinfo');
  };
};