import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import './ModalHeader.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from 'src/font_awesome/solid';

type ModalHeaderProps = {
  children?: React.ReactNode;
  closingIsDisabled?: boolean;
  subtitle?: string;
  title?: React.ReactNode;
  titleClass?: string;
  titleId?: string;
  variant?: string;
  onRequestClose?: (...args: unknown[]) => unknown;
};

export default class ModalHeader extends Component<ModalHeaderProps> {
  // Don’t pass event to props callback; the callback is not always called from
  // event listeners:

  handleCloseClick = () => this.props.onRequestClose && this.props.onRequestClose();

  get titleClassName() {
    return classNames('ModalHeader__title', this.props.titleClass);
  }

  render() {
    return (
      <header className="ModalHeader">
        <div className="ModalHeader__heading">
          {this.props.children ?
            this.props.children : (
              <Fragment>
                <h1 className={this.titleClassName} id={this.props.titleId}>
                  {this.props.variant && (
                    <FontAwesomeIcon className={this.props.variant} icon={faExclamationTriangle} />
                  )}
                  {this.props.title}
                </h1>
                {this.props.subtitle && (
                  <h2 className="ModalHeader__subtitle">
                    {this.props.subtitle}
                  </h2>
                )}
              </Fragment>
            )}
        </div>
        {this.props.onRequestClose && (
          <button
            aria-label="Close"
            className="btn btn-sm btn-close"
            disabled={this.props.closingIsDisabled}
            type="button"
            onClick={this.handleCloseClick}
          />
        )}
      </header>
    );
  }
}
