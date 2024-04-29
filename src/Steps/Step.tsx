import React from 'react';
import classNames from 'classnames';

import './Step.scss';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type StepProps = DivProps & {
  circleText?: string | React.ReactNode;
  className?: string;
  text?: string | React.ReactNode;
};

const Step = ({
  className,
  circleText,
  text,
  ...props
}: StepProps) => (
  <div
    className={classNames('Step', className, `Step--${circleText}`)}
    {...props}
  >
    <div className="Step__circle">
      <span className="Step__circle__number">
        {circleText}
      </span>
    </div>
    <span className="Step__text-container">
      <span className="Step__text-container__text">{text}</span>
    </span>
  </div>
);

export default Step;
