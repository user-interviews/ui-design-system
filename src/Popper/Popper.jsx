import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Popper as ReactPopper, Reference } from 'react-popper';

import './Popper.scss';

const ARROW_OFFSET = 10;

function Popper(props) {
  const { showArrow } = props;
  const offset = showArrow ? ARROW_OFFSET : 0;

  return (
    <Manager>
      <Reference>
        {({ ref }) => React.cloneElement(props.children, { ref })}
      </Reference>
      {
        props.visible && (
          <ReactPopper
            modifiers={[
              {
                name: 'offset',
                options: { offset: [0, offset] },
              },
            ]}
            placement={props.placement}
            strategy={props.strategy}
          >
            {
              ({
                arrowProps,
                placement,
                ref,
                style,
              }) => (
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
                  {
                    props.showArrow && (
                      <span className="Popper__arrow" ref={arrowProps.ref} style={arrowProps.style} />
                    )
                  }
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
  showArrow: PropTypes.bool,
  strategy: PropTypes.string,
  text: PropTypes.node.isRequired,
  visible: PropTypes.bool,
};

Popper.defaultProps = {
  dark: false,
  header: undefined,
  placement: 'top',
  showArrow: false,
  strategy: undefined,
  visible: false,
};

export default Popper;
