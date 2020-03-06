import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Form.scss';

export default function Form(props) {
  return (
    <form
      className={classNames('Form', { 'Form--inline': props.inline })}
      id={props.id}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  children: undefined,
  inline: false,
};
