import React, { Component } from 'react';
import Button from '../Button';
import './ModalFooter.scss';

type ModalFooterProps = {
  children?: React.ReactNode;
  closingIsDisabled?: boolean;
  dismissButtonText?: string;
  onRequestClose?: (...args: unknown[]) => unknown;
};

export default class ModalFooter extends Component<ModalFooterProps> {
  static defaultProps: {
    children: undefined;
    closingIsDisabled: boolean;
    dismissButtonText: string;
    onRequestClose: undefined;
  };
  // Don’t pass event to props callback; the callback is not always called from
  // event listeners:

  handleCloseClick = () => this.props.onRequestClose && this.props.onRequestClose();

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
            {this.props.dismissButtonText || 'Cancel'}
          </Button>
        )}
        {this.props.children}
      </div>
    );
  }
}
