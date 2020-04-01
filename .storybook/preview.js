import React from 'react';
import { addDecorator } from "@storybook/react";
import  { withA11y } from "@storybook/addon-a11y";

addDecorator(story => <div style={{ padding: '1rem' }}>{story()}</div>);
addDecorator(withA11y);
