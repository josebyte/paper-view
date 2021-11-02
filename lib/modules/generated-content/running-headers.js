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

var RunningHeaders =
/*#__PURE__*/
function (_Handler) {
  (0, _inherits2["default"])(RunningHeaders, _Handler);

  function RunningHeaders(chunker, polisher, caller) {
    var _this;

    (0, _classCallCheck2["default"])(this, RunningHeaders);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RunningHeaders).call(this, chunker, polisher, caller));
    _this.runningSelectors = {};
    _this.elements = {};
    return _this;
  }

  (0, _createClass2["default"])(RunningHeaders, [{
    key: "onDeclaration",
    value: function onDeclaration(declaration, dItem, dList, rule) {
      var _this2 = this;

      if (declaration.property === "position") {
        var selector = _cssTree["default"].generate(rule.ruleNode.prelude);

        var identifier = declaration.value.children.first().name;

        if (identifier === "running") {
          var value;

          _cssTree["default"].walk(declaration, {
            visit: "Function",
            enter: function enter(node, item, list) {
              value = node.children.first().name;
            }
          });

          this.runningSelectors[value] = {
            identifier: identifier,
            value: value,
            selector: selector
          };
        }
      }

      if (declaration.property === "content") {
        _cssTree["default"].walk(declaration, {
          visit: "Function",
          enter: function enter(funcNode, fItem, fList) {
            if (funcNode.name.indexOf("element") > -1) {
              var _selector = _cssTree["default"].generate(rule.ruleNode.prelude);

              var func = funcNode.name;
              var _value = funcNode.children.first().name;
              var args = [_value]; // we only handle first for now

              var style = "first";

              _selector.split(",").forEach(function (s) {
                // remove before / after
                s = s.replace(/::after|::before/, "");
                _this2.elements[s] = {
                  func: func,
                  args: args,
                  value: _value,
                  style: style || "first",
                  selector: s,
                  fullSelector: _selector
                };
              });
            }
          }
        });
      }
    }
  }, {
    key: "afterParsed",
    value: function afterParsed(fragment) {
      for (var _i = 0, _Object$keys = Object.keys(this.runningSelectors); _i < _Object$keys.length; _i++) {
        var name = _Object$keys[_i];
        var set = this.runningSelectors[name];
        var selected = Array.from(fragment.querySelectorAll(set.selector));

        if (set.identifier === "running") {
          for (var _i2 = 0, _selected = selected; _i2 < _selected.length; _i2++) {
            var header = _selected[_i2];
            header.style.display = "none";
          }
        }
      }
    }
  }, {
    key: "afterPageLayout",
    value: function afterPageLayout(fragment) {
      for (var _i3 = 0, _Object$keys2 = Object.keys(this.runningSelectors); _i3 < _Object$keys2.length; _i3++) {
        var name = _Object$keys2[_i3];
        var set = this.runningSelectors[name];
        var selected = fragment.querySelector(set.selector);

        if (selected) {
          // let cssVar;
          if (set.identifier === "running") {
            // cssVar = selected.textContent.replace(/\\([\s\S])|(["|'])/g,"\\$1$2");
            // this.styleSheet.insertRule(`:root { --string-${name}: "${cssVar}"; }`, this.styleSheet.cssRules.length);
            // fragment.style.setProperty(`--string-${name}`, `"${cssVar}"`);
            set.first = selected;
          } else {
            console.warn(set.value + "needs css replacement");
          }
        }
      } // move elements


      if (!this.orderedSelectors) {
        this.orderedSelectors = this.orderSelectors(this.elements);
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.orderedSelectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var selector = _step.value;

          if (selector) {
            var el = this.elements[selector];

            var _selected2 = fragment.querySelector(selector);

            if (_selected2) {
              var running = this.runningSelectors[el.args[0]];

              if (running && running.first) {
                _selected2.innerHTML = ""; // Clear node
                // selected.classList.add("pagedjs_clear-after"); // Clear ::after

                var clone = running.first.cloneNode(true);
                clone.style.display = null;

                _selected2.appendChild(clone);
              }
            }
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
    }
    /**
    * Assign a weight to @page selector classes
    * 1) page
    * 2) left & right
    * 3) blank
    * 4) first & nth
    * 5) named page
    * 6) named left & right
    * 7) named first & nth
    * @param {string} [s] selector string
    * @return {int} weight
    */

  }, {
    key: "pageWeight",
    value: function pageWeight(s) {
      var weight = 1;
      var selector = s.split(" ");
      var parts = selector.length && selector[0].split(".");
      parts.shift(); // remove empty first part

      switch (parts.length) {
        case 4:
          if (parts[3] === "pagedjs_first_page") {
            weight = 7;
          } else if (parts[3] === "pagedjs_left_page" || parts[3] === "pagedjs_right_page") {
            weight = 6;
          }

          break;

        case 3:
          if (parts[1] === "pagedjs_named_page") {
            if (parts[2].indexOf(":nth-of-type") > -1) {
              weight = 7;
            } else {
              weight = 5;
            }
          }

          break;

        case 2:
          if (parts[1] === "pagedjs_first_page") {
            weight = 4;
          } else if (parts[1] === "pagedjs_blank_page") {
            weight = 3;
          } else if (parts[1] === "pagedjs_left_page" || parts[1] === "pagedjs_right_page") {
            weight = 2;
          }

          break;

        default:
          if (parts[0].indexOf(":nth-of-type") > -1) {
            weight = 4;
          } else {
            weight = 1;
          }

      }

      return weight;
    }
    /**
    * Orders the selectors based on weight
    *
    * Does not try to deduplicate base on specifity of the selector
    * Previous matched selector will just be overwritten
    * @param {obj} [obj] selectors object
    * @return {Array} orderedSelectors
    */

  }, {
    key: "orderSelectors",
    value: function orderSelectors(obj) {
      var selectors = Object.keys(obj);
      var weighted = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: []
      };
      var orderedSelectors = [];

      for (var _i4 = 0, _selectors = selectors; _i4 < _selectors.length; _i4++) {
        var s = _selectors[_i4];
        var w = this.pageWeight(s);
        weighted[w].unshift(s);
      }

      for (var i = 1; i <= 7; i++) {
        orderedSelectors = orderedSelectors.concat(weighted[i]);
      }

      return orderedSelectors;
    }
  }, {
    key: "beforeTreeParse",
    value: function beforeTreeParse(text, sheet) {
      // element(x) is parsed as image element selector, so update element to element-ident
      sheet.text = text.replace(/element[\s]*\(([^|^#)]*)\)/g, "element-ident($1)");
    }
  }]);
  return RunningHeaders;
}(_handler["default"]);

var _default = RunningHeaders;
exports["default"] = _default;