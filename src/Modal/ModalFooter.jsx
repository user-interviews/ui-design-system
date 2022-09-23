import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/Button';
import './ModalFooter.scss';

export default class ModalFooter extends Component {
  // Don’t pass event to props callback; the callback is not always called from
  // event listeners:

  handleCloseClick = () => this.props.onRequestClose();

  render() {
    return (
      <div className="ModalFooter">
        {this.props.onRequestClose && (
          <Button
            disabled={this.props.closingIsDisabled}
            type="button"
            variant="transparent"
            onClick={this.handleCloseClick}
          >
            {this.props.dismissButtonText}
          </Button>
        )}
        {this.props.children}
      </div>
    );
  }
}

ModalFooter.propTypes = {
  children: PropTypes.node,
  closingIsDisabled: PropTypes.bool,
  dismissButtonText: PropTypes.string,
  onRequestClose: PropTypes.func,
};

ModalFooter.defaultProps = {
  children: undefined,
  closingIsDisabled: false,
  dismissButtonText: 'Cancel',
  onRequestClose: undefined,
};
