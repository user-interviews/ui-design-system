import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Form.scss';

export default function Form(props) {
  return (
    <form
      className={classNames('Form', props.className, { 'Form--inline': props.inline })}
      id={props.id}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  children: undefined,
  className: undefined,
  inline: false,
  onSubmit: undefined,
};
