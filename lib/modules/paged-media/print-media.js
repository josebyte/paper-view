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

var _cssTree = _interopRequireDefault(require("css-tree"));

var PrintMedia =
/*#__PURE__*/
function (_Handler) {
  (0, _inherits2["default"])(PrintMedia, _Handler);

  function PrintMedia(chunker, polisher, caller) {
    (0, _classCallCheck2["default"])(this, PrintMedia);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PrintMedia).call(this, chunker, polisher, caller));
  }

  (0, _createClass2["default"])(PrintMedia, [{
    key: "onAtMedia",
    value: function onAtMedia(node, item, list) {
      var media = this.getMediaName(node);
      var rules;

      if (media === "print") {
        rules = node.block.children; // Remove rules from the @media block

        node.block.children = new _cssTree["default"].List(); // Append rules to the end of main rules list

        list.appendList(rules);
      }
    }
  }, {
    key: "getMediaName",
    value: function getMediaName(node) {
      var media = "";

      if (typeof node.prelude === "undefined" || node.prelude.type !== "AtrulePrelude") {
        return;
      }

      _cssTree["default"].walk(node.prelude, {
        visit: "Identifier",
        enter: function enter(identNode, iItem, iList) {
          media = identNode.name;
        }
      });

      return media;
    }
  }]);
  return PrintMedia;
}(_handler["default"]);

var _default = PrintMedia;
exports["default"] = _default;