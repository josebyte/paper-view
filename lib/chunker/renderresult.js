"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OverflowContentError = void 0;

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

/**
 * Render result.
 * @class
 */
var RenderResult = function RenderResult(breakToken, error) {
  (0, _classCallCheck2["default"])(this, RenderResult);
  this.breakToken = breakToken;
  this.error = error;
};

var OverflowContentError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(OverflowContentError, _Error);

  function OverflowContentError(message, items) {
    var _this;

    (0, _classCallCheck2["default"])(this, OverflowContentError);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(OverflowContentError).call(this, message));
    _this.items = items;
    return _this;
  }

  return OverflowContentError;
}((0, _wrapNativeSuper2["default"])(Error));

exports.OverflowContentError = OverflowContentError;
var _default = RenderResult;
exports["default"] = _default;