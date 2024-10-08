import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '../font_awesome/solid';

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

class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

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

  handleToggleTooltipClick = (event) => {
    if (this.props.withHover) return;

    event.preventDefault();
    this.clickOutsideListener = addClickOutsideListener(
      event.target.parentNode,
      this.handleClickOutside,
    );

    this.setState((state) => ({ visible: !state.visible }), this.handleShow);
  };

  handleToggleTooltipHover = () => {
    this.setState((state) => ({ visible: !state.visible }), this.handleShow);
  };

  render() {
    return (
      <Popper
        dark={this.props.theme !== 'light'}
        header={this.props.header}
        placement={this.props.placement}
        showArrow
        strategy={this.props.strategy}
        text={this.props.text}
        visible={this.state.visible}
      >
        <span
          aria-hidden="true"
          className={classNames('Tooltip__icon', this.props.iconClasses)}
          /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
          tabIndex="0"
          onClick={this.handleToggleTooltipClick}
          onKeyPress={this.handleToggleTooltipClick}
          onMouseEnter={this.props.withHover && this.handleToggleTooltipHover}
          onMouseLeave={this.props.withHover && this.handleToggleTooltipHover}
        >
          <FontAwesomeIcon icon={this.props.icon} />
        </span>
      </Popper>
    );
  }
}

Tooltip.propTypes = {
  header: PropTypes.string,
  icon: PropTypes.object,
  iconClasses: PropTypes.string,
  placement: PropTypes.string.isRequired,
  strategy: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  theme: PropTypes.string,
  withHover: PropTypes.bool,
  onShow: PropTypes.func,
};

// Default props ok for class component
Tooltip.defaultProps = {
  icon: faQuestionCircle,
  iconClasses: undefined,
  header: undefined,
  strategy: undefined,
  theme: 'dark',
  withHover: undefined,
  onShow: undefined,
};

export default Tooltip;
