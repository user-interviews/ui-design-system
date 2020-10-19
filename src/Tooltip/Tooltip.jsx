import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import Popper from '../Popper';

import './Tooltip.scss';

function addClickOutsideListener(element, callback) {
  const listener = (event) => {
    if (!element.contains(event.target)) {
      callback(event);
    }
  };

  window.addEventListener('click', listener);

  return listener;
}

function removeClickOutsideListener(listener) {
  window.removeEventListener('click', listener);
}

export default class Tooltip extends Component {
  static propTypes = {
    header: PropTypes.string,
    icon: PropTypes.object,
    iconClasses: PropTypes.string,
    placement: PropTypes.string.isRequired,
    strategy: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    theme: PropTypes.string,
    onShow: PropTypes.func,
  };

  static defaultProps = {
    icon: faQuestionCircle,
    iconClasses: undefined,
    header: undefined,
    strategy: undefined,
    theme: 'dark',
    onShow: undefined,
  };

  state = {
    visible: false,
  };

  handleClickOutside = () => {
    if (this.clickOutsideListener) {
      removeClickOutsideListener(this.clickOutsideListener);
    }

    this.setState({ visible: false });
  };

  handleShow = () => {
    if (this.state.visible && this.props.onShow) {
      this.props.onShow();
    }
  };

  handleToggleTooltip = (event) => {
    event.preventDefault();
    this.clickOutsideListener = addClickOutsideListener(
      event.target.parentNode,
      this.handleClickOutside,
    );

    this.setState((state) => ({ visible: !state.visible }), this.handleShow);
  };

  render() {
    return (
      <Popper
        dark={this.props.theme !== 'light'}
        header={this.props.header}
        placement={this.props.placement}
        strategy={this.props.strategy}
        text={this.props.text}
        visible={this.state.visible}
      >
        <span
          aria-hidden="true"
          className={classNames('Tooltip__icon', this.props.iconClasses)}
          tabIndex="0"
          onClick={this.handleToggleTooltip}
          onKeyPress={this.handleToggleTooltip}
        >
          <FontAwesomeIcon icon={this.props.icon} />
        </span>
      </Popper>
    );
  }
}
