import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import react from 'react';

import * as dotenv from 'dotenv';

dotenv.config();

const bugsnagClient = bugsnag({
  apiKey: process.env.BUGSNAG_API_KEY_JS,
});

bugsnagClient.use(bugsnagReact, react);

export { bugsnagClient };
