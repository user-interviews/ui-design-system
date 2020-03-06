"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormControl;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./FormControl.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function addErrorClass(child) {
  if (!child || !child.props) return child;
  var wrappedClassName = (0, _classnames.default)(child.props.className, {
    'is-invalid': this.hasErrors
  });
  return (0, _react.cloneElement)(child, {
    className: wrappedClassName
  });
}

function renderErrors(errors) {
  if (typeof errors === 'string') {
    return errors;
  }

  return _react.default.createElement("ol", {
    className: "invalid-feedback__list"
  }, // eslint-disable-next-line react/no-array-index-key
  errors.map(function (e, idx) {
    return _react.default.createElement("li", {
      key: idx
    }, e);
  }));
}

function FormControl(props) {
  var errors = props.errors,
      inputKey = props.inputKey;
  var hasErrors = errors[inputKey] && errors[inputKey].length > 0;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('FormControl', props.inputClassName)
  }, _react.Children.map(props.children, addErrorClass, {
    hasErrors: hasErrors
  }), props.displayErrorText && hasErrors && _react.default.createElement("div", {
    className: "invalid-feedback"
  }, renderErrors(errors[inputKey])), props.description && _react.default.createElement("div", {
    className: "form-input__description"
  }, props.description));
}

FormControl.defaultProps = {
  children: undefined,
  description: '',
  displayErrorText: true,
  errors: {},
  inputClassName: '',
  inputKey: null
};