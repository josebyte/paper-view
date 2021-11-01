"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _sheet = _interopRequireDefault(require("./sheet"));

var _base = _interopRequireDefault(require("./base"));

var _hook = _interopRequireDefault(require("../utils/hook"));

var _request = _interopRequireDefault(require("../utils/request"));

var Polisher =
/*#__PURE__*/
function () {
  function Polisher(setup) {
    (0, _classCallCheck2["default"])(this, Polisher);
    this.sheets = [];
    this.inserted = [];
    this.hooks = {};
    this.hooks.onUrl = new _hook["default"](this);
    this.hooks.onAtPage = new _hook["default"](this);
    this.hooks.onAtMedia = new _hook["default"](this);
    this.hooks.onRule = new _hook["default"](this);
    this.hooks.onDeclaration = new _hook["default"](this);
    this.hooks.onContent = new _hook["default"](this);
    this.hooks.onSelector = new _hook["default"](this);
    this.hooks.onPseudoSelector = new _hook["default"](this);
    this.hooks.onImport = new _hook["default"](this);
    this.hooks.beforeTreeParse = new _hook["default"](this);
    this.hooks.beforeTreeWalk = new _hook["default"](this);
    this.hooks.afterTreeWalk = new _hook["default"](this);

    if (setup !== false) {
      this.setup();
    }
  }

  (0, _createClass2["default"])(Polisher, [{
    key: "setup",
    value: function setup() {
      this.base = this.insert(_base["default"]);
      this.styleEl = document.createElement("style");
      document.head.appendChild(this.styleEl);
      this.styleSheet = this.styleEl.sheet;
      return this.styleSheet;
    }
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var _arguments = arguments,
            _this = this;

        var fetched,
            urls,
            i,
            f,
            _loop,
            url,
            _args2 = arguments;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fetched = [];
                urls = [];

                for (i = 0; i < _args2.length; i++) {
                  f = void 0;

                  if ((0, _typeof2["default"])(_args2[i]) === "object") {
                    _loop = function _loop(url) {
                      var obj = _arguments[i];
                      f = new Promise(function (resolve, reject) {
                        urls.push(url);
                        resolve(obj[url]);
                      });
                    };

                    for (url in _args2[i]) {
                      _loop(url);
                    }
                  } else {
                    urls.push(_args2[i]);
                    f = (0, _request["default"])(_args2[i]).then(function (response) {
                      return response.text();
                    });
                  }

                  fetched.push(f);
                }

                _context2.next = 5;
                return Promise.all(fetched).then(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee(originals) {
                    var text, index;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            text = "";
                            index = 0;

                          case 2:
                            if (!(index < originals.length)) {
                              _context.next = 10;
                              break;
                            }

                            _context.next = 5;
                            return _this.convertViaSheet(originals[index], urls[index]);

                          case 5:
                            text = _context.sent;

                            _this.insert(text);

                          case 7:
                            index++;
                            _context.next = 2;
                            break;

                          case 10:
                            return _context.abrupt("return", text);

                          case 11:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function add() {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "convertViaSheet",
    value: function () {
      var _convertViaSheet = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(cssStr, href) {
        var sheet, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, str, text;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sheet = new _sheet["default"](href, this.hooks);
                _context3.next = 3;
                return sheet.parse(cssStr);

              case 3:
                // Insert the imported sheets first
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 6;
                _iterator = sheet.imported[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 20;
                  break;
                }

                url = _step.value;
                _context3.next = 12;
                return (0, _request["default"])(url).then(function (response) {
                  return response.text();
                });

              case 12:
                str = _context3.sent;
                _context3.next = 15;
                return this.convertViaSheet(str, url);

              case 15:
                text = _context3.sent;
                this.insert(text);

              case 17:
                _iteratorNormalCompletion = true;
                _context3.next = 8;
                break;

              case 20:
                _context3.next = 26;
                break;

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](6);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 26:
                _context3.prev = 26;
                _context3.prev = 27;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 29:
                _context3.prev = 29;

                if (!_didIteratorError) {
                  _context3.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context3.finish(29);

              case 33:
                return _context3.finish(26);

              case 34:
                this.sheets.push(sheet);

                if (typeof sheet.width !== "undefined") {
                  this.width = sheet.width;
                }

                if (typeof sheet.height !== "undefined") {
                  this.height = sheet.height;
                }

                if (typeof sheet.orientation !== "undefined") {
                  this.orientation = sheet.orientation;
                }

                return _context3.abrupt("return", sheet.toString());

              case 39:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 22, 26, 34], [27,, 29, 33]]);
      }));

      function convertViaSheet(_x2, _x3) {
        return _convertViaSheet.apply(this, arguments);
      }

      return convertViaSheet;
    }()
  }, {
    key: "insert",
    value: function insert(text) {
      var head = document.querySelector("head");
      var style = document.createElement("style");
      style.setAttribute("data-pagedjs-inserted-styles", "true");
      style.appendChild(document.createTextNode(text));
      head.appendChild(style);
      this.inserted.push(style);
      return style;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.styleEl.remove();
      this.inserted.forEach(function (s) {
        s.remove();
      });
      this.sheets = [];
    }
  }]);
  return Polisher;
}();

var _default = Polisher;
exports["default"] = _default;