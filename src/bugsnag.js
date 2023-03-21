import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

const config = {
  apiKey: process.env.REACT_APP_BUGSNAG_API_KEY_JS,
  plugins: [new BugsnagPluginReact()],
};

export const bugsnagClient = Bugsnag.start(config);
