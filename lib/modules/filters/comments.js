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

var _dom = require("../../utils/dom");

var CommentsFilter =
/*#__PURE__*/
function (_Handler) {
  (0, _inherits2["default"])(CommentsFilter, _Handler);

  function CommentsFilter(chunker, polisher, caller) {
    (0, _classCallCheck2["default"])(this, CommentsFilter);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CommentsFilter).call(this, chunker, polisher, caller));
  }

  (0, _createClass2["default"])(CommentsFilter, [{
    key: "filter",
    value: function filter(content) {
      (0, _dom.filterTree)(content, null, NodeFilter.SHOW_COMMENT);
    }
  }]);
  return CommentsFilter;
}(_handler["default"]);

var _default = CommentsFilter;
exports["default"] = _default;