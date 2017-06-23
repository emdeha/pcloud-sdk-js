"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ApiRequest;

var _superagent = require("superagent");

var _superagent2 = _interopRequireDefault(_superagent);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inProgress = {};
var waitCallbacks = {};

function ApiRequest(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  (0, _invariant2.default)(url.length, "`url` is required.");

  var _options$method = options.method,
      method = _options$method === undefined ? "get" : _options$method,
      _options$responseType = options.responseType,
      responseType = _options$responseType === undefined ? "json" : _options$responseType,
      _options$onProgress = options.onProgress,
      onProgress = _options$onProgress === undefined ? function () {} : _options$onProgress,
      _options$xhr = options.xhr,
      xhr = _options$xhr === undefined ? function () {} : _options$xhr,
      _options$pipe = options.pipe,
      pipe = _options$pipe === undefined ? false : _options$pipe,
      _options$files = options.files,
      files = _options$files === undefined ? [] : _options$files;


  if (method === "get" && url in inProgress) {
    if (waitCallbacks[url] === undefined) {
      waitCallbacks[url] = [];
    }

    return new Promise(function (resolve) {
      waitCallbacks[url].push([function (response) {
        resolve(response);
      }, options]);
    });
  } else {
    inProgress[url] = 1;
  }

  // call
  var req = _superagent2.default[method](url);

  // progress upload/download
  req.on("progress", onProgress);

  // attaching files
  // works for both node/web
  // in one case its path to file, in the other is File object
  if (files.length) {
    (0, _invariant2.default)(["put", "post"].indexOf(method) !== -1, "When uploading, `method` must be either `post` or `put`.");

    files.forEach(function (_ref) {
      var _ref$name = _ref.name,
          name = _ref$name === undefined ? "file" : _ref$name,
          file = _ref.file;

      (0, _invariant2.default)(file, "`file` is a required property of `files`.");

      req.attach(name, file);
    });
  }

  if ("responseType" in req && responseType !== "json") {
    req.responseType(responseType);
  }

  if (ENV === "node") {
    // node only progress based on the stream events
    req.use(_utils.httpProgressMiddleware);

    /**
     * `superagent` cannot be used as then-able object when piping and since
     * when piping the "end" is called anyway, we need to create and
     * manage different promise for this case only.
     */
    if (pipe) {
      return new Promise(function (resolve, reject) {
        req.pipe(pipe).on('finish', resolve).on('error', reject);
      });
    }
  }

  // pass xhr object before calling the request
  // important for custom checking the progress of the call
  // in case of intentionally blocking operations and so on...
  xhr(req.xhr);

  /*
  return new Promise((resolve, reject) => {
    req.end((error, response) => {
      if (error) {
        clearInProgressCallbacks();
        reject({ result: error.status || 500, error: "Network Error" });
      } else {
        if (responseType === "json") {
          const { body } = response;
           callbacksReceiveBody(body);
          resolve(body);
        } else if (responseType === "text") {
          resolve(response.text);
        }
      }
    });
  });
  */

  return req.then(function (response) {
    if (responseType === "json") {
      var body = response.body;


      callbacksReceiveBody(body);
      return body;
    } else if (responseType === "text") {
      return response.text;
    }
  }).catch(function (error) {
    var errorObj = { result: error.status || 500, error: "Network Error" };

    clearInProgressCallbacks();

    return Promise.reject(errorObj);
  });

  // clear currently running urls
  function clearInProgressCallbacks() {
    if (url in inProgress) {
      delete inProgress[url];
    }
  }

  // send all currently waiting tasks their data
  function callbacksReceiveBody(body) {
    clearInProgressCallbacks();

    if (url in waitCallbacks) {
      while (waitCallbacks[url].length) {
        var _waitCallbacks$url$sh = waitCallbacks[url].shift(),
            _waitCallbacks$url$sh2 = _slicedToArray(_waitCallbacks$url$sh, 1),
            callback = _waitCallbacks$url$sh2[0];

        callback(body);
      }
    }
  }
}