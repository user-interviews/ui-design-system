"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Form;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./Form.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Form(props) {
  return _react.default.createElement("form", {
    className: (0, _classnames.default)('Form', props.inline ? 'inline' : ''),
    id: props.id,
    onSubmit: props.onSubmit
  }, props.children);
}

Form.defaultProps = {
  children: undefined,
  inline: false
};