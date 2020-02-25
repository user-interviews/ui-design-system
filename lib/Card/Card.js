"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Card;

var _react = _interopRequireDefault(require("react"));

var _Card = _interopRequireDefault(require("react-bootstrap/Card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Card(_ref) {
  var children = _ref.children,
      title = _ref.title;
  return _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.default.Body, null, _react.default.createElement(_Card.default.Title, null, title), children));
}

Card.defaultProps = {
  children: undefined,
  title: ''
};