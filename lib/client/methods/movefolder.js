'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function (folderid, tofolderid) {
    (0, _invariant2.default)(typeof folderid === 'number', '`folderid` must be number.');
    (0, _invariant2.default)(folderid !== 0, '`folderid` cannot be 0.');
    (0, _invariant2.default)(tofolderid, '`tofolderid` is required.');

    return client.api('renamefolder', {
      params: {
        folderid: folderid,
        tofolderid: tofolderid
      }
    }).then(function (response) {
      return response.metadata;
    });
  };
};