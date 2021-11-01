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

var ScriptsFilter =
/*#__PURE__*/
function (_Handler) {
  (0, _inherits2["default"])(ScriptsFilter, _Handler);

  function ScriptsFilter(chunker, polisher, caller) {
    (0, _classCallCheck2["default"])(this, ScriptsFilter);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ScriptsFilter).call(this, chunker, polisher, caller));
  }

  (0, _createClass2["default"])(ScriptsFilter, [{
    key: "filter",
    value: function filter(content) {
      content.querySelectorAll("script").forEach(function (script) {
        script.remove();
      });
    }
  }]);
  return ScriptsFilter;
}(_handler["default"]);

var _default = ScriptsFilter;
exports["default"] = _default;