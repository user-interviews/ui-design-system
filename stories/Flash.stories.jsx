import React from 'react';
import { withKnobs, text, radios } from '@storybook/addon-knobs';

import { withFlash, MessageTypes, withFlashPropTypes } from 'src/Flash';

import '../scss/global.scss';

let DummyComponent = ({ type, message, setFlashMessage }) => (
  <div>
    <p>Click the button to see a flash message.  Use the knobs to try different types!</p>
    <button className="btn btn-primary" type="button" onClick={() => setFlashMessage(type, message)}>Submit</button>
  </div>
  );
DummyComponent.propTypes = withFlashPropTypes;
DummyComponent = withFlash(DummyComponent);

export const FlashMessage = () => (
  <DummyComponent
    message={text('Message', 'Your action was a success!')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);

export default {
  title: 'Design System/Flash',
  component: withFlash,
  decorators: [withKnobs],
};
