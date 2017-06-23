'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function (folderid, toname) {
    (0, _invariant2.default)(typeof folderid === 'number', '`folderid` must be number.');
    (0, _invariant2.default)(folderid !== 0, '`folderid` cannot be 0.');
    (0, _invariant2.default)(toname, '`toname` is required.');
    (0, _invariant2.default)(toname.length, '`toname` is required.');

    return client.api('renamefolder', {
      params: {
        folderid: folderid,
        toname: toname
      }
    }).then(function (response) {
      return response.metadata;
    });
  };
};