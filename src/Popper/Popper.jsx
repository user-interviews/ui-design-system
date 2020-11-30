import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Popper as ReactPopper, Reference } from 'react-popper';

import './Popper.scss';

function Popper(props) {
  return (
    <Manager>
      <Reference>
        {({ ref }) => React.cloneElement(props.children, { ref })}
      </Reference>
      {
        props.visible && (
          <ReactPopper placement={props.placement} strategy={props.strategy}>
            {
              ({ placement, ref, style }) => (
                <div
                  className={classNames('Popper', { 'Popper--dark': props.dark })}
                  data-placement={placement}
                  ref={ref}
                  style={style}
                >
                  {
                    props.header && (
                      <div className="Popper__header">
                        {props.header}
                      </div>
                    )
                  }

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
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
  header: PropTypes.string,
  placement: PropTypes.string,
  strategy: PropTypes.string,
  text: PropTypes.node.isRequired,
  visible: PropTypes.bool,
};

Popper.defaultProps = {
  dark: false,
  header: undefined,
  placement: 'top',
  strategy: undefined,
  visible: false,
};

export default Popper;
