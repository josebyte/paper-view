"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _epubjs = _interopRequireDefault(require("epubjs"));

// import JSZip from "jszip";
// window.JSZip = JSZip;
var Epub =
/*#__PURE__*/
function () {
  function Epub(bookData) {// this.epub = ePub({
    //   worker: false,
    //   replacements: true
    // });

    (0, _classCallCheck2["default"])(this, Epub);
  }

  (0, _createClass2["default"])(Epub, [{
    key: "open",
    value: function open(bookData) {
      var _this = this;

      return (0, _epubjs["default"])(bookData, {
        replacements: true
      }).then(function (book) {
        _this.book = book;
        return _this.sections(_this.book.spine);
      });
    }
  }, {
    key: "sections",
    value: function () {
      var _sections = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(spine) {
        var text, pattern, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, section, href, html;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = "";
                pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = spine[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 17;
                  break;
                }

                section = _step.value;
                href = section.href;
                _context.next = 12;
                return fetch(href).then(function (response) {
                  return response.text();
                }).then(function (t) {
                  var matches = pattern.exec(t);
                  return matches && matches.length && matches[1];
                });

              case 12:
                html = _context.sent;
                text += html; // let body = html.querySelector("body");
                // text += body.innerHTML;

              case 14:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 17:
                _context.next = 23;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 23:
                _context.prev = 23;
                _context.prev = 24;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 26:
                _context.prev = 26;

                if (!_didIteratorError) {
                  _context.next = 29;
                  break;
                }

                throw _iteratorError;

              case 29:
                return _context.finish(26);

              case 30:
                return _context.finish(23);

              case 31:
                return _context.abrupt("return", text);

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 19, 23, 31], [24,, 26, 30]]);
      }));

      function sections(_x) {
        return _sections.apply(this, arguments);
      }

      return sections;
    }()
  }]);
  return Epub;
}();

var _default = Epub;
exports["default"] = _default;