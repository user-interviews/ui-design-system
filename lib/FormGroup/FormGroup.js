"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormGroup;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FormControl = _interopRequireDefault(require("../FormControl/FormControl"));

var _FormLabel = _interopRequireDefault(require("../FormLabel/FormLabel"));

require("./FormGroup.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormGroup(props) {
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('FormGroup', props.className),
    id: props.id
  }, props.label && _react.default.createElement(_FormLabel.default, {
    className: props.labelClassName,
    labelHtmlFor: props.labelHtmlFor,
    legend: props.legend,
    required: props.required,
    text: props.label
  }), _react.default.createElement(_FormControl.default, {
    description: props.description,
    displayErrorText: props.displayErrorText,
    errors: props.errors,
    inputClassName: props.inputClassName,
    inputKey: props.inputKey
  }, props.children));
}

FormGroup.defaultProps = {
  children: undefined,
  className: '',
  description: '',
  displayErrorText: true,
  errors: {},
  inputClassName: '',
  inputKey: null,
  label: '',
  labelClassName: '',
  labelHtmlFor: '',
  legend: undefined,
  required: false
};