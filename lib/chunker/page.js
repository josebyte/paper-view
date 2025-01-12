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

var _layout2 = _interopRequireDefault(require("./layout"));

var _eventEmitter = _interopRequireDefault(require("event-emitter"));

/**
 * Render a page
 * @class
 */
var Page =
/*#__PURE__*/
function () {
  function Page(pagesArea, pageTemplate, blank, hooks) {
    (0, _classCallCheck2["default"])(this, Page);
    this.pagesArea = pagesArea;
    this.pageTemplate = pageTemplate;
    this.blank = blank;
    this.width = undefined;
    this.height = undefined;
    this.hooks = hooks; // this.element = this.create(this.pageTemplate);
  }

  (0, _createClass2["default"])(Page, [{
    key: "create",
    value: function create(template, after) {
      //let documentFragment = document.createRange().createContextualFragment( TEMPLATE );
      //let page = documentFragment.children[0];
      var clone = document.importNode(this.pageTemplate.content, true);
      var page, index;

      if (after) {
        this.pagesArea.insertBefore(clone, after.nextElementSibling);
        index = Array.prototype.indexOf.call(this.pagesArea.children, after.nextElementSibling);
        page = this.pagesArea.children[index];
      } else {
        this.pagesArea.appendChild(clone);
        page = this.pagesArea.lastChild;
      }

      var pagebox = page.querySelector(".pagedjs_pagebox");
      var area = page.querySelector(".pagedjs_page_content");
      var footnotesArea = page.querySelector(".pagedjs_footnote_area");
      var size = area.getBoundingClientRect();
      area.style.columnWidth = Math.round(size.width) + "px";
      area.style.columnGap = "calc(var(--pagedjs-margin-right) + var(--pagedjs-margin-left))"; // area.style.overflow = "scroll";

      this.width = Math.round(size.width);
      this.height = Math.round(size.height);
      this.element = page;
      this.pagebox = pagebox;
      this.area = area;
      this.footnotesArea = footnotesArea;
      return page;
    }
  }, {
    key: "createWrapper",
    value: function createWrapper() {
      var wrapper = document.createElement("div");
      this.area.appendChild(wrapper);
      this.wrapper = wrapper;
      return wrapper;
    }
  }, {
    key: "index",
    value: function index(pgnum) {
      this.position = pgnum;
      var page = this.element; // let pagebox = this.pagebox;

      var index = pgnum + 1;
      var id = "page-".concat(index);
      this.id = id; // page.dataset.pageNumber = index;

      page.dataset.pageNumber = index;
      page.setAttribute("id", id);

      if (this.name) {
        page.classList.add("pagedjs_" + this.name + "_page");
      }

      if (this.blank) {
        page.classList.add("pagedjs_blank_page");
      }

      if (pgnum === 0) {
        page.classList.add("pagedjs_first_page");
      }

      if (pgnum % 2 !== 1) {
        page.classList.remove("pagedjs_left_page");
        page.classList.add("pagedjs_right_page");
      } else {
        page.classList.remove("pagedjs_right_page");
        page.classList.add("pagedjs_left_page");
      }
    }
    /*
    size(width, height) {
    	if (width === this.width && height === this.height) {
    		return;
    	}
    	this.width = width;
    	this.height = height;
    		this.element.style.width = Math.round(width) + "px";
    	this.element.style.height = Math.round(height) + "px";
    	this.element.style.columnWidth = Math.round(width) + "px";
    }
    */

  }, {
    key: "layout",
    value: function () {
      var _layout = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(contents, breakToken, maxChars) {
        var renderResult, newBreakToken;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.clear();
                this.startToken = breakToken;
                this.layoutMethod = new _layout2["default"](this.area, this.hooks, maxChars);
                _context.next = 5;
                return this.layoutMethod.renderTo(this.wrapper, contents, breakToken);

              case 5:
                renderResult = _context.sent;
                newBreakToken = renderResult.breakToken;
                this.addListeners(contents);
                this.endToken = newBreakToken;
                return _context.abrupt("return", newBreakToken);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function layout(_x, _x2, _x3) {
        return _layout.apply(this, arguments);
      }

      return layout;
    }()
  }, {
    key: "append",
    value: function () {
      var _append = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(contents, breakToken) {
        var renderResult, newBreakToken;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.layoutMethod) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", this.layout(contents, breakToken));

              case 2:
                _context2.next = 4;
                return this.layoutMethod.renderTo(this.wrapper, contents, breakToken);

              case 4:
                renderResult = _context2.sent;
                newBreakToken = renderResult.breakToken;
                this.endToken = newBreakToken;
                return _context2.abrupt("return", newBreakToken);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function append(_x4, _x5) {
        return _append.apply(this, arguments);
      }

      return append;
    }()
  }, {
    key: "getByParent",
    value: function getByParent(ref, entries) {
      var e;

      for (var i = 0; i < entries.length; i++) {
        e = entries[i];

        if (e.dataset.ref === ref) {
          return e;
        }
      }
    }
  }, {
    key: "onOverflow",
    value: function onOverflow(func) {
      this._onOverflow = func;
    }
  }, {
    key: "onUnderflow",
    value: function onUnderflow(func) {
      this._onUnderflow = func;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.removeListeners();
      this.wrapper && this.wrapper.remove();
      this.createWrapper();
    }
  }, {
    key: "addListeners",
    value: function addListeners(contents) {
      if (typeof ResizeObserver !== "undefined") {
        this.addResizeObserver(contents);
      } else {
        this._checkOverflowAfterResize = this.checkOverflowAfterResize.bind(this, contents);
        this.element.addEventListener("overflow", this._checkOverflowAfterResize, false);
        this.element.addEventListener("underflow", this._checkOverflowAfterResize, false);
      } // TODO: fall back to mutation observer?


      this._onScroll = function () {
        if (this.listening) {
          this.element.scrollLeft = 0;
        }
      }.bind(this); // Keep scroll left from changing


      this.element.addEventListener("scroll", this._onScroll);
      this.listening = true;
      return true;
    }
  }, {
    key: "removeListeners",
    value: function removeListeners() {
      this.listening = false;

      if (typeof ResizeObserver !== "undefined" && this.ro) {
        this.ro.disconnect();
      } else if (this.element) {
        this.element.removeEventListener("overflow", this._checkOverflowAfterResize, false);
        this.element.removeEventListener("underflow", this._checkOverflowAfterResize, false);
      }

      this.element && this.element.removeEventListener("scroll", this._onScroll);
    }
  }, {
    key: "addResizeObserver",
    value: function addResizeObserver(contents) {
      var _this = this;

      var wrapper = this.wrapper;
      var prevHeight = wrapper.getBoundingClientRect().height;
      this.ro = new ResizeObserver(function (entries) {
        if (!_this.listening) {
          return;
        }

        requestAnimationFrame(function () {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var entry = _step.value;
              var cr = entry.contentRect;

              if (cr.height > prevHeight) {
                _this.checkOverflowAfterResize(contents);

                prevHeight = wrapper.getBoundingClientRect().height;
              } else if (cr.height < prevHeight) {
                // TODO: calc line height && (prevHeight - cr.height) >= 22
                _this.checkUnderflowAfterResize(contents);

                prevHeight = cr.height;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        });
      });
      this.ro.observe(wrapper);
    }
  }, {
    key: "checkOverflowAfterResize",
    value: function checkOverflowAfterResize(contents) {
      if (!this.listening || !this.layoutMethod) {
        return;
      }

      var newBreakToken = this.layoutMethod.findBreakToken(this.wrapper, contents, this.startToken);

      if (newBreakToken) {
        this.endToken = newBreakToken;
        this._onOverflow && this._onOverflow(newBreakToken);
      }
    }
  }, {
    key: "checkUnderflowAfterResize",
    value: function checkUnderflowAfterResize(contents) {
      if (!this.listening || !this.layoutMethod) {
        return;
      }

      var endToken = this.layoutMethod.findEndToken(this.wrapper, contents);

      if (endToken) {
        this._onUnderflow && this._onUnderflow(endToken);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.removeListeners();
      this.element.remove();
      this.element = undefined;
      this.wrapper = undefined;
    }
  }]);
  return Page;
}();

(0, _eventEmitter["default"])(Page.prototype);
var _default = Page;
exports["default"] = _default;