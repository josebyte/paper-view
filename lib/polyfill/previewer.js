"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _eventEmitter = _interopRequireDefault(require("event-emitter"));

var _chunker = _interopRequireDefault(require("../chunker/chunker"));

var _polisher = _interopRequireDefault(require("../polisher/polisher"));

var _handlers = require("../utils/handlers");

var Previewer =
/*#__PURE__*/
function () {
  function Previewer() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Previewer);
    // this.preview = this.getParams("preview") !== "false";
    // Process styles
    this.polisher = new _polisher["default"](false); // Chunk contents

    this.chunker = new _chunker["default"](); // Hooks

    this.hooks = {}; // default size

    this.size = {
      width: {
        value: 8.5,
        unit: "in"
      },
      height: {
        value: 11,
        unit: "in"
      },
      format: undefined,
      orientation: undefined
    };
    this.chunker.on("page", function (page) {
      _this.emit("page", page);
    });
    this.chunker.on("rendering", function () {
      _this.emit("rendering", _this.chunker);
    });
  }

  (0, _createClass2["default"])(Previewer, [{
    key: "initializeHandlers",
    value: function initializeHandlers() {
      var _this2 = this;

      var handlers = (0, _handlers.initializeHandlers)(this.chunker, this.polisher, this);
      handlers.on("size", function (size) {
        _this2.size = size;

        _this2.emit("size", size);
      });
      handlers.on("atpages", function (pages) {
        _this2.atpages = pages;

        _this2.emit("atpages", pages);
      });
      return handlers;
    }
  }, {
    key: "registerHandlers",
    value: function registerHandlers() {
      return _handlers.registerHandlers.apply(_handlers.registerHandlers, arguments);
    }
  }, {
    key: "getParams",
    value: function getParams(name) {
      var param;
      var url = new URL(window.location);
      var params = new URLSearchParams(url.search);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = params.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pair = _step.value;

          if (pair[0] === name) {
            param = pair[1];
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

      return param;
    }
  }, {
    key: "wrapContent",
    value: function wrapContent() {
      // Wrap body in template tag
      var body = document.querySelector("body"); // Check if a template exists

      var template;
      template = body.querySelector(":scope > template[data-ref='pagedjs-content']");

      if (!template) {
        // Otherwise create one
        template = document.createElement("template");
        template.dataset.ref = "pagedjs-content";
        template.innerHTML = body.innerHTML;
        body.innerHTML = "";
        body.appendChild(template);
      }

      return template.content;
    }
  }, {
    key: "removeStyles",
    value: function removeStyles() {
      var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      // Get all stylesheets
      var stylesheets = Array.from(doc.querySelectorAll("link[rel='stylesheet']"));
      var hrefs = stylesheets.map(function (sheet) {
        sheet.remove();
        return sheet.href;
      }); // Get inline styles

      var inlineStyles = Array.from(doc.querySelectorAll("style:not([data-pagedjs-inserted-styles])"));
      inlineStyles.forEach(function (inlineStyle) {
        var obj = {};
        obj[window.location.href] = inlineStyle.textContent;
        hrefs.push(obj);
        inlineStyle.remove();
      });
      return hrefs;
    }
  }, {
    key: "preview",
    value: function () {
      var _preview = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(contentFrom, renderTo, stylesheets) {
        var _this$polisher;

        var content, startTime, flow, endTime;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (typeof contentFrom === "string") {
                  content = contentFrom;
                } else {
                  contentFrom.style.display = "none";
                  content = contentFrom.innerHTML;
                }

                if (!content) {
                  content = this.wrapContent();
                }

                if (!stylesheets) {
                  stylesheets = this.removeStyles();
                }

                this.polisher.setup();
                this.handlers = this.initializeHandlers();
                _context.next = 7;
                return (_this$polisher = this.polisher).add.apply(_this$polisher, (0, _toConsumableArray2["default"])(stylesheets));

              case 7:
                startTime = performance.now(); // Render flow

                _context.next = 10;
                return this.chunker.flow(content, renderTo);

              case 10:
                flow = _context.sent;
                endTime = performance.now();
                flow.performance = endTime - startTime;
                flow.size = this.size;
                this.emit("rendered", flow);
                return _context.abrupt("return", flow);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preview(_x, _x2, _x3) {
        return _preview.apply(this, arguments);
      }

      return preview;
    }()
  }]);
  return Previewer;
}();

(0, _eventEmitter["default"])(Previewer.prototype);
var _default = Previewer;
exports["default"] = _default;