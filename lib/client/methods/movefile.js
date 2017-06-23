'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function (fileid, tofolderid) {
    (0, _invariant2.default)(typeof fileid === 'number', '`fileid` must be number.');
    (0, _invariant2.default)(fileid !== 0, '`fileid` cannot be 0.');
    (0, _invariant2.default)(tofolderid, '`tofolderid` is required.');

    return client.api('renamefile', {
      params: {
        fileid: fileid,
        tofolderid: tofolderid
      }
    }).then(function (response) {
      return response.metadata;
    });
  };
};