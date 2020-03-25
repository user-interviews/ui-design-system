import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Popper as ReactPopper, Reference } from 'react-popper';

import './Popper.scss';

function Popper(props) {
  return (
    <Manager>
      <Reference>
        {({ ref }) => <div ref={ref}>{props.children}</div>}
      </Reference>
      {
        props.visible && (
          <ReactPopper placement={props.placement}>
            {
              ({ placement, ref, style }) => (
                <div
                  className={classNames('Popper', { 'Popper--dark': props.dark })}
                  data-placement={placement}
                  ref={ref}
                  style={style}
                >
                  {props.text}
                </div>
              )
            }
          </ReactPopper>
        )
      }
    </Manager>
  );
}

Popper.propTypes = {
  dark: PropTypes.bool,
  placement: PropTypes.string,
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};

Popper.defaultProps = {
  dark: false,
  placement: 'top',
  visible: false,
};

export default Popper;
