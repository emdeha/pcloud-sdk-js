'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

exports.default = function (_ref) {
  var client = _ref.client;
  return function (fileid) {
    return client.api('getfilelink', {
      params: {
        fileid: fileid,
        forcedownload: 1
      }
    }).then(function (ret) {
      return (0, _utils.pCloudUrl)(ret);
    });
  };
};