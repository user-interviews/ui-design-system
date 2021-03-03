import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalFooter.scss';

export default class ModalFooter extends Component {
  static propTypes = {
    children: PropTypes.node,
    closingIsDisabled: PropTypes.bool,
    dismissButtonText: PropTypes.string,
    onRequestClose: PropTypes.func,
  };

  static defaultProps = {
    children: undefined,
    closingIsDisabled: false,
    dismissButtonText: 'Cancel',
    onRequestClose: undefined,
  };

  // Don’t pass event to props callback; the callback is not always called from
  // event listeners:

  handleCloseClick = () => this.props.onRequestClose();

  render() {
    return (
      <div className="ModalFooter">
        {this.props.onRequestClose && (
          <button
            className="btn btn-transparent"
            disabled={this.props.closingIsDisabled}
            type="button"
            onClick={this.handleCloseClick}
          >
            {this.props.dismissButtonText}
          </button>
        )}
        {this.props.children}
      </div>
    );
  }
}
