import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-solid-svg-icons';

import * as keyCodes from '../utils/keycodes';

import './Accordion.scss';

export const POSITION_LEFT = 'left';
export const POSITION_RIGHT = 'right';

const AccordianTemplate = ({ Header, Content }) => (
  <Fragment>
    {Header}
    {Content}
  </Fragment>
);

AccordianTemplate.propTypes = {
  Content: PropTypes.node.isRequired,
  Header: PropTypes.node.isRequired,
};

export default class Accordion extends Component {
  static propTypes = {
    accordionClass: PropTypes.string,
    children: PropTypes.node.isRequired,
    collapsedIconClass: PropTypes.string,
    defaultCollapsed: PropTypes.bool,
    expandedIconClass: PropTypes.string,
    header: PropTypes.node.isRequired,
    iconPosition: PropTypes.string,
    id: PropTypes.string.isRequired,
    Layout: PropTypes.func,
    onToggle: PropTypes.func,
  };

  static defaultProps = {
    accordionClass: undefined,
    collapsedIconClass: 'fas fa-angle-up',
    defaultCollapsed: false,
    expandedIconClass: 'fas fa-angle-down',
    iconPosition: POSITION_LEFT,
    Layout: AccordianTemplate,
    onToggle: undefined,
  };

  constructor() {
    super();
    this.state = { 
      show: this.defaultCollapsed 
    };
  }

  onKeyboardPress = (event) => {
    if (event.keyCode !== keyCodes.ENTER) return null;

    return this.handleToggle();
  };

  onHeaderClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.handleToggle();
  };

  handleToggle() {
    this.setState((state) => ({ show: !state.show }), this.toggleCollapsed);
  }

  get id() {
    return this.props.id;
  }

  get accordionClasses() {
    return classNames(this.props.accordionClass, 'accordion');
  }

  get defaultCollapsed() {
    return this.props.defaultCollapsed;
  }

  get collapsedIconClass() {
    return this.props.collapsedIconClass;
  }

  get expandedIconClass() {
    return this.props.expandedIconClass;
  }

  toggleCollapsed() {
    const action = this.state.show ? 'hide' : 'show';
    const { onToggle } = this.props;

    //$(`#collapse-${this.id}`).collapse(action);

    if (onToggle) {
      onToggle();
    }
  }

  render() {
    const { Layout } = this.props;

    return (
      <div
        className={this.accordionClasses}
        id={`${this.id}-accordion`}
        role="tablist"
      >
        <Layout
          Content={(
            <div
              aria-labelledby={`heading-${this.id}`}
              className={
                classNames('accordion__body', 'collapse', { show: !this.defaultCollapsed })
              }
              data-parent={`#${this.id}-accordion`}
              id={`collapse-${this.id}`}
              role="tabpanel"
            >
              {this.props.children}
            </div>
          )}
          Header={(
            <div id={this.id}>
              <div
                aria-controls={this.id}
                aria-expanded={!this.defaultCollapsed}
                className={classNames('accordion__header', { collapsed: this.state.show })}
                data-toggle="collapse"
                id={`heading-${this.id}`}
                role="tab"
                tabIndex={0}
                onClick={this.onHeaderClick}
                onKeyUp={this.onKeyboardPress}
              >
                {this.props.iconPosition === POSITION_LEFT && (
                <div className="accordion__icons accordion__icons--left">
                  <FontAwesomeIcon icon={faChevronDown} />
                  <FontAwesomeIcon icon={faChevronUp} />
                </div>
                )}
                {this.props.header}
                {this.props.iconPosition === POSITION_RIGHT && (
                <div className="accordion__icons accordion__icons--right">
                  
                  <FontAwesomeIcon icon={faChevronDown} />
                  <FontAwesomeIcon icon={faChevronUp} />
                </div>
                )}
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}
