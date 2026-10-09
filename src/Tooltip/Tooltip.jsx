import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.handleClickOutside();
    } else if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      this.toggleTooltip(event);
    }
  };

  handleToggleTooltipClick = (event) => {
    if (this.props.withHover) return;
    this.toggleTooltip(event);
  };

  toggleTooltip = (event) => {
    event.preventDefault();
    if (this.clickOutsideListener) {
      removeClickOutsideListener(this.clickOutsideListener);
    }
    this.clickOutsideListener = addClickOutsideListener(
      event.currentTarget.parentNode,
      this.handleClickOutside,
    );

    this.setState((state) => ({ visible: !state.visible }), this.handleShow);
  };

  handleToggleTooltipHover = () => {
    this.setState({ visible: true }, this.handleShow);
  };

  componentWillUnmount() {
    if (this.clickOutsideListener) {
      removeClickOutsideListener(this.clickOutsideListener);
    }
  }

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
          aria-expanded={this.state.visible}
          aria-label={
            typeof this.props.text === 'string'
              ? this.props.text
              : 'More information'
          }
          className={classNames('Tooltip__icon', this.props.iconClasses)}
          role="button"
          tabIndex="0"
          // Rich content can contain links; retain its outside-click dismissal.
          onBlur={
            typeof this.props.text === 'string'
              ? this.handleClickOutside
              : undefined
          }
          onClick={this.handleToggleTooltipClick}
          onKeyDown={this.handleKeyDown}
          onMouseEnter={
            this.props.withHover ? this.handleToggleTooltipHover : undefined
          }
          onMouseLeave={
            this.props.withHover ? this.handleClickOutside : undefined
          }
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
