import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './ModalHeader.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default class ModalHeader extends Component {
  // Don’t pass event to props callback; the callback is not always called from
  // event listeners:

  handleCloseClick = () => this.props.onRequestClose();

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
            className="btn btn-sm btn-link close"
            disabled={this.props.closingIsDisabled}
            type="button"
            onClick={this.handleCloseClick}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </header>
    );
  }
}

ModalHeader.propTypes = {
  children: PropTypes.node,
  closingIsDisabled: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  titleClass: PropTypes.string,
  titleId: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onRequestClose: PropTypes.func,
};

ModalHeader.defaultProps = {
  children: undefined,
  closingIsDisabled: false,
  title: undefined,
  titleClass: '',
  subtitle: undefined,
  variant: undefined,
  onRequestClose: undefined,
};
