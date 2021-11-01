"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _handler = _interopRequireDefault(require("../handler"));

var Splits =
/*#__PURE__*/
function (_Handler) {
  (0, _inherits2["default"])(Splits, _Handler);

  function Splits(chunker, polisher, caller) {
    (0, _classCallCheck2["default"])(this, Splits);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Splits).call(this, chunker, polisher, caller));
  }

  (0, _createClass2["default"])(Splits, [{
    key: "afterPageLayout",
    value: function afterPageLayout(pageElement, page, breakToken, chunker) {
      var splits = Array.from(pageElement.querySelectorAll("[data-split-from]"));
      var pages = pageElement.parentNode;
      var index = Array.prototype.indexOf.call(pages.children, pageElement);
      var prevPage;

      if (index === 0) {
        return;
      }

      prevPage = pages.children[index - 1];
      var from; // Capture the last from element

      splits.forEach(function (split) {
        var ref = split.dataset.ref;
        from = prevPage.querySelector("[data-ref='" + ref + "']:not([data-split-to])");

        if (from) {
          from.dataset.splitTo = ref;

          if (!from.dataset.splitFrom) {
            from.dataset.splitOriginal = true;
          }
        }
      }); // Fix alignment on the deepest split element

      if (from) {
        this.handleAlignment(from);
      }
    }
  }, {
    key: "handleAlignment",
    value: function handleAlignment(node) {
      var styles = window.getComputedStyle(node);
      var align = styles["text-align"];
      var alignLast = styles["text-align-last"];
      node.dataset.lastSplitElement = "true";

      if (align === "justify" && alignLast === "auto") {
        node.dataset.alignLastSplitElement = "justify";
      } else {
        node.dataset.alignLastSplitElement = alignLast;
      }
    }
  }]);
  return Splits;
}(_handler["default"]);

var _default = Splits;
exports["default"] = _default;