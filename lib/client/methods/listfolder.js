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
    var folderid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    (0, _invariant2.default)(typeof folderid === 'number', '`folderid` must be a number.');

    return client.api('listfolder', {
      params: {
        folderid: folderid
      }
    }).then(function (response) {
      return response.metadata;
    });
  };
};