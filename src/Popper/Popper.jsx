import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Popper as ReactPopper, Reference } from 'react-popper';

import './Popper.scss';

const ARROW_OFFSET = 10;

function Popper({
  children,
  dark = false,
  header,
  placement = 'top',
  showArrow = false,
  strategy,
  text,
  visible = false,
}) {
  const offset = showArrow ? ARROW_OFFSET : 0;

  return (
    <Manager>
      <Reference>
        {({ ref }) => React.cloneElement(children, { ref })}
      </Reference>
      {
        visible && (
          <ReactPopper
            modifiers={[
              {
                name: 'offset',
                options: { offset: [0, offset] },
              },
            ]}
            placement={placement}
            strategy={strategy}
          >
            {
              ({
                arrowProps,
                placement: dataPlacement,
                ref,
                style,
              }) => (
                <div
                  className={classNames('Popper', { 'Popper--dark': dark })}
                  data-placement={dataPlacement}
                  ref={ref}
                  style={style}
                >
                  {
                      header && (
                        <div className="Popper__header">
                          {header}
                        </div>
                      )
                    }

                  {text}
                  {
                    showArrow && (
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

export default Popper;
