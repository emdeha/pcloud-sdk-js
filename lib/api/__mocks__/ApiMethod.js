"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.on = on;
exports.one = one;
exports.text = text;
exports.success = success;
exports.error = error;


/**
* Mock for api/method
*
* Exports the actual mock (apiMethod) as default and:
*  on(match: (method, options) => boolean, respond: (method, params) => data, onFire?: () => void)
*  one: same as on, but handler is removed upon first usage
*
* helpers that enhance response for use in the respond function
* success(data: mixed) => success api payload
* error(result: number, error: string) => error api payload
* httpError(code: number, error: string) => network error payload
*
*/
var handlers = [];

exports.default = jest.fn(function (method, options) {
  var promised = null;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref3 = _step.value;

      var _ref2 = _slicedToArray(_ref3, 3);

      var match = _ref2[0];
      var respond = _ref2[1];
      var _onFire = _ref2[2];

      if (match(method, options)) {

        promised = respond(method, options);

        if (_onFire) {
          _onFire(method, options);
        }

        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (promised === null) {
    throw new Error("No route found for: " + method + ". Handlers: " + handlers.length + " ");
  }

  return promised;
});
function on(match, respond, onFire) {
  handlers.push([match, respond, onFire]);
}

function one(match, respond, onFire) {
  var me = [function () {
    var isMatch = match.apply(null, arguments);

    if (isMatch) {
      handlers.splice(handlers.indexOf(me), 1);
    }

    return isMatch;
  }, respond, onFire];

  handlers.push(me);
}

function text(data) {
  return function (method) {
    return Promise.resolve(data);
  };
}

function success(data) {
  return function (method) {
    data.result = 0;

    return Promise.resolve(data);
  };
}

function error(result, error) {
  return function (method, options) {
    var errorObj = { result: result, error: error };

    if (options.onError) {
      options.onError(errorObj);
    }

    return Promise.reject(errorObj);
  };
}