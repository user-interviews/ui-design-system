import React from 'react';

import classNames from 'classnames';

import './Step.scss';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type StepProps = DivProps & {
  /** Marker inside the circle; when a string, also used in `Step--{circleText}` modifier classes. */
  circleText?: string | React.ReactNode;
  className?: string;
  /** Label beside the circle. */
  text?: string | React.ReactNode;
};

function Step({ className, circleText, text, ...props }: StepProps) {
  return (
    <div
      className={classNames('Step', className, `Step--${circleText}`)}
      {...props}
    >
      <div className="Step__circle">
        <span className="Step__circle__number">{circleText}</span>
      </div>
      <span className="Step__text-container">
        <span className="Step__text-container__text">{text}</span>
      </span>
    </div>
  );
}

export default Step;
