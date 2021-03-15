function defaultErrorString(actionText = undefined) {
  return (
    `There was an unexpected error${actionText ? ` ${actionText}` : ''}, please try again later`
  );
}

function compileAlertErrors(error, actionText = undefined, options = {}) {
  // eslint-disable-next-line no-unused-vars
  const { delimiter = '\n\n', pointerMap = undefined } = options;

  const fieldErrors = error.fieldErrors();

  let message;
  if (Object.keys(fieldErrors).length) {
    const warnings = Object.values(fieldErrors)
      .reduce((total, current) => [...total, ...current], []);

    message =
      `There were errors${actionText ? ` ${actionText}` : ''}:\n\n${warnings.join(delimiter)}`;
  } else {
    message = defaultErrorString(actionText);
  }

  return message;
}

class UiError extends Error {
  get isValidationError() {
    return false;
  }

  get rawErrors() {
    // this should return whatever raw blob the API might have attached to it... ideally this DIAF
    return null;
  }

  apiErrors() {
    // this should return API related errors { field_key: errors[] } that are unlikely user-friendly
    return {};
  }

  fieldErrors() {
    // this should return a hash of human-facing { field_key: errors[] }
    return {};
  }
}

export class DisplayableError extends UiError {
  constructor(message) {
    super();

    this.message = message;
  }
}

export class ErrorRenderer {
  // TODO UI-2998 -- not sure if this belongs in "common" if this became a react component
  static alert(error, actionText = undefined, options = {}) {
    let message;

    if (error instanceof DisplayableError) {
      ({ message } = error);
    } else if (error instanceof UiError) {
      message = compileAlertErrors(error, actionText, options);
    } else {
      message = actionText ? defaultErrorString(actionText) : error.message;
    }

    if (ENV.DEBUG_JAVASCRIPT_ERRORS) {
      window.console.log(error);
    }

    window.alert(message);
  }
}

export default UiError;