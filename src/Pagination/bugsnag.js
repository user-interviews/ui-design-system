import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import react from 'react';

const bugsnagClient = bugsnag({
  apiKey: ENV.BUGSNAG_API_KEY_JS,
  beforeSend(report) {
    // eslint-disable-next-line no-param-reassign
    report.user = { ...ENV.BUGSNAG_USER };
  },
  consoleBreadcrumbsEnabled: ENV.BUGSNAG_CONSOLE_BREADCRUMBS,
  releaseStage: ENV.BUGSNAG_RELEASE_STAGE,
});

bugsnagClient.use(bugsnagReact, react);

const ErrorBoundary = bugsnagClient.getPlugin('react');

export { bugsnagClient };

export default ErrorBoundary;
