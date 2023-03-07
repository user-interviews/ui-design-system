import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import react from 'react';

const bugsnagClient = bugsnag({
  apiKey: process.env.REACT_APP_BUGSNAG_API_KEY_JS,
});

bugsnagClient.use(bugsnagReact, react);

export { bugsnagClient };
