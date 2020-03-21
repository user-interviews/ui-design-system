import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text, radios } from '@storybook/addon-knobs';
import { withPadding } from './decorators';

import { withFlash, MessageTypes, withFlashPropTypes } from '../src/Flash';

let DummyComponent = ({ type, message, setFlashMessage }) => (
  <div>
    <p>Click the button to see a flash message.  Use the knobs to try different types!</p>
    <button className="btn btn-primary" type="button" onClick={() => setFlashMessage(type, message)}>Submit</button>
  </div>
  );
DummyComponent.propTypes = withFlashPropTypes;
DummyComponent = withFlash(DummyComponent);

export const flashStory = () => (
  <DummyComponent
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
    message={text('Message', 'Your action was a success!')}
  />
);

flashStory.story = {
  name: 'flash message',
};

export default {
  title: 'Design System/Flash',
  component: withFlash,
  decorators: [withA11y, withPadding, withKnobs],
};
