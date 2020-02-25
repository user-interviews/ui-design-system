"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./Pill.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Pill = function Pill(_ref) {
  var color = _ref.color,
      size = _ref.size,
      text = _ref.text;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('Pill', _defineProperty({}, "Pill--".concat(color), !!color), _defineProperty({}, "Pill--".concat(size), !!size))
  }, text);
};

Pill.defaultProps = {
  color: undefined,
  size: undefined
};
var _default = Pill;
exports.default = _default;