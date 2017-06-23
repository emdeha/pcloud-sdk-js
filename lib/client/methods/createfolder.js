'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var client = _ref.client;
  return function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var parentfolderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    (0, _invariant2.default)(name.length, '`name` for is required');
    (0, _invariant2.default)(typeof name === 'string', '`name` is required and be a string.');
    (0, _invariant2.default)(typeof parentfolderid === 'number', '`parentfolderid` is required.');

    return client.api('createfolder', {
      params: {
        name: name,
        folderid: parentfolderid
      }
    }).then(function (response) {
      return response.metadata;
    });
  };
};