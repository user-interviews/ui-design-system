"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormLabel;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./FormLabel.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormLabel(props) {
  var className = props.className,
      labelHtmlFor = props.labelHtmlFor,
      legend = props.legend,
      required = props.required,
      text = props.text;
  var label = labelHtmlFor ? _react.default.createElement("label", {
    htmlFor: labelHtmlFor
  }, text) : _react.default.createElement("span", null, text);
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('FormLabel', className)
  }, label, required && _react.default.createElement("span", {
    className: "helper-text"
  }, "\xA0(required)"), legend);
}

FormLabel.defaultProps = {
  className: '',
  labelHtmlFor: '',
  legend: undefined,
  required: false
};