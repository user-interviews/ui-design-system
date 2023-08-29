import React from 'react';
import './TestPill.scss';

import { TestPillProps } from './TestPill.types';

// Define the TestPill component
const TestPill: React.FC<TestPillProps> = ({ color, text }) => {

  const getColor = () => {
    if (color === 'red') return 'red'
    if (color === 'blue') return 'blue'
  }
  return <div className="test-pill" style={{backgroundColor: getColor()}}>{text}</div>;
};

export default TestPill;
