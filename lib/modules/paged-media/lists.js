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

var Lists =
/*#__PURE__*/
function (_Handler) {
  (0, _inherits2["default"])(Lists, _Handler);

  function Lists(chunker, polisher, caller) {
    (0, _classCallCheck2["default"])(this, Lists);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Lists).call(this, chunker, polisher, caller));
  }

  (0, _createClass2["default"])(Lists, [{
    key: "afterParsed",
    value: function afterParsed(content) {
      var orderedLists = content.querySelectorAll("ol");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = orderedLists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var list = _step.value;
          this.addDataNumbers(list);
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
    }
  }, {
    key: "afterPageLayout",
    value: function afterPageLayout(pageElement, page, breakToken, chunker) {
      var orderedLists = pageElement.getElementsByTagName("ol");
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = orderedLists[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var list = _step2.value;

          if (list.hasChildNodes()) {
            list.start = list.firstElementChild.dataset.itemNum;
          } else {
            list.parentNode.removeChild(list);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "addDataNumbers",
    value: function addDataNumbers(list) {
      var start = 1;

      if (list.hasAttribute("start")) {
        start = parseInt(list.getAttribute("start"), 10);

        if (isNaN(start)) {
          start = 1;
        }
      }

      var items = list.children;

      for (var i = 0; i < items.length; i++) {
        items[i].setAttribute("data-item-num", i + start);
      }
    }
  }]);
  return Lists;
}(_handler["default"]);

var _default = Lists;
exports["default"] = _default;