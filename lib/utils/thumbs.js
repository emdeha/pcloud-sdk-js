"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createParser;
var THUMB_FILEID = exports.THUMB_FILEID = 0;

var THUMB_RESULT = exports.THUMB_RESULT = 1;
var THUMB_SIZE = exports.THUMB_SIZE = 2;
var THUMB_LINEID = exports.THUMB_LINEID = 2;
var THUMB_URL = exports.THUMB_URL = 3;

function createParser() {
  var lastLinePos = 0;
  var thumbs = [];
  var nextLinePos = void 0;
  //let currentLine;

  return function (text) {
    var setThumbs = [];

    while (1) {
      nextLinePos = text.indexOf("\n", lastLinePos + 1);

      if (nextLinePos === -1) {
        break;
      }

      var _thumbObj2 = _thumbObj(text.substr(lastLinePos, nextLinePos - lastLinePos)),
          result = _thumbObj2.result,
          size = _thumbObj2.size,
          url = _thumbObj2.url,
          fileid = _thumbObj2.fileid;

      lastLinePos = nextLinePos;

      if (result === 6001) {
        url = thumbs[parseInt(size, 10)].url;
        result = 0;
      }

      if (result === 0) {
        var thumb = { url: url, fileid: fileid };

        thumbs.push(thumb);
        setThumbs.push(thumb);
      }
    }

    return setThumbs;
  };
}

function _thumbObj(line) {
  var obj = line.split("|");

  return {
    result: parseInt(obj[THUMB_RESULT], 10),
    url: THUMB_URL in obj ? obj[THUMB_URL].trim() : "",
    fileid: parseInt(obj[THUMB_FILEID], 10),
    size: obj[THUMB_SIZE]
  };
}