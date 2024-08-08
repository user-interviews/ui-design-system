import React from 'react';

function Controls(props) {
  return (
    <div className="Header__controls">
      {props.children}
    </div>
  );
}

export default Controls;
