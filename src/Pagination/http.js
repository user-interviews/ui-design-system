import { Base64 } from 'js-base64';
import { JsonApiDataStore } from 'jsonapi-datastore';
/*
Wrappers for fetch() that automatically configure appropriate headers and transform the response
into JSON for us because any other content type is the devil's work, as well as for QueryString
that configure parsing and such to presume the Rails bracket array format
 */
import * as QS from 'query-string';

//import { bugsnagClient } from './bugsnag';
import UiError from './errors';

const APPLICATION_JSON = 'application/json';

const Status = {
  UNKNOWN: -1,
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

/*
 Note that `atob` and `btoa` were not previously handling UTF-8 encodings properly... instead
 converting special characters into assumed ASCII which then failed to parse right.

 https://github.com/dankogai/js-base64#decode-vs-atob-and-encode-vs-btoa
 */
function base64Decode(value, utf8 = true) {
  return utf8 ? Base64.decode(value) : Base64.atob(value);
}

function base64Encode(value, utf8 = true) {
  let valueToEncode = value;

  if (value instanceof Object) {
    valueToEncode = JSON.stringify(value);
  }

  return utf8 ? Base64.encode(valueToEncode, true) : Base64.btoa(valueToEncode);
}

const FormatResponse = {
  jsonApi: ({ includeMeta }) => (response) => {
    if (includeMeta) {
      return new JsonApiDataStore().syncWithMeta(response);
    }

    return new JsonApiDataStore().sync(response);
  },

  raw: response => response,
};

// https://github.com/sindresorhus/query-string for other options not supported right now
const QueryString = {
  base64Decode,
  base64Encode,

  // Returns querystring portion of a URL
  extract: str => QS.extract(str),

  // Returns just query object
  parse: str => QS.parse(str, { arrayFormat: 'bracket' }),

  // Returns { url, query: {} }
  parseUrl: str => QS.parseUrl(str, { arrayFormat: 'bracket' }),

  // Parses QS params object into string
  stringify: (obj, opts = {}) => QS.stringify(obj, { arrayFormat: 'bracket', ...opts }),
};

function getCSRFParam() {
  return document.querySelector('meta[name="csrf-param"]').getAttribute('content');
}

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

class HttpError extends UiError {
  constructor({
    content = {},
    errors = content.errors,
    message,
    meta = content.meta,
    status,
    statusText,
  } = {}) {
    super();

    this._errors = errors || (content.data || {}).errors || [];
    this._friendlyErrors = (meta || {}).friendlyErrors || [];
    this._meta = meta || {};

    this.content = content;
    this.message = message || 'An unexpected error has occurred, please try again later';
    this.status = status;
    this.statusText = statusText;
  }

  get isValidationError() {
    return this.status === Status.UNPROCESSABLE_ENTITY;
  }

  get rawErrors() {
    return this._errors;
  }

  apiErrors() {
    return this._getJsonApiErrors();
  }

  fieldErrors() {
    const friendlyApiErrors = this._getFriendlyApiErrors();

    if (Object.keys(friendlyApiErrors).length) {
      // Prioritize friendly API first...
      return friendlyApiErrors;
    }

    if (this.rawErrors instanceof Array) {
      // then deal with our general nightmare
      return this._getFieldErrorsFromArray(this.rawErrors);
    }

    if (typeof this.rawErrors !== 'object') {
      // ignore any other thing that might have come in
      return {};
    }

    // well... lets hope this is correct by now
    return this.rawErrors || {};
  }

  _getJsonApiErrors() {
    // JSON API errors are an array of
    // { source: { pointer: '/data/attributes/name' }, detail: 'cannot be nil' },
    if (!(this._errors instanceof Array) || !this._errors.length || !this._errors[0].source) {
      // errors often come down with a mixture of types
      return {};
    }

    return this._errors.reduce((map, error) => {
      const { source, detail } = error;
      const values = map[source.pointer] || [];
      values.push(detail);

      return { ...map, [source.pointer]: values };
    }, {});
  }

  _getFriendlyApiErrors() {
    return this._friendlyErrors.reduce((errors, e) => {
      const values = (errors[e.field] || []).concat(e.humanErrors);

      return {
        ...errors,
        [e.field]: values,
      };
    }, {});
  }

  _getFieldErrorsFromArray(errors) {
    if (!errors.length || typeof errors[0] === 'string') {
      // don't know how to turn this into a KVP of some kind
      return {};
    }

    // reduce an array of KVP into a normal hash
    return errors.reduce((total, errorObj) => {
      const newMerge = Object.entries(errorObj).reduce((merge, kvp) => {
        const [key, value] = kvp;
        const values = total[key] || [];
        values.push(value);

        return {
          ...merge,
          [key]: values,
        };
      }, {});

      // merge is safe to override b/c building it includes entries in total
      return {
        ...total,
        ...newMerge,
      };
    }, {});
  }
}

function addCSRFSettings(request) {
  const csrfRequest = {
    ...request,
    headers: {
      'X-Requested-With': 'XMLHTTPRequest',
      'X-CSRF-Token': getCSRFToken(),
    },
    credentials: 'same-origin',
  };

  if (request.headers) {
    csrfRequest.headers = {
      ...request.headers,
      ...csrfRequest.headers,
    };
  }

  return csrfRequest;
}

function buildRequest(method, body) {
  const request = {
    headers: {
      Accept: APPLICATION_JSON,
    },
    cache: 'default',
    method,
  };

  if (body) {
    if (body instanceof FormData) {
      request.body = body;
    } else {
      request.body = JSON.stringify(body);
      request.headers['Content-Type'] = APPLICATION_JSON;
    }
  }

  return addCSRFSettings(request);
}

async function callFetch(path, request) {
  let error;

  try {
    const response = await fetch(path, request);

    if (response.status === Status.NO_CONTENT) {
      return null;
    }

    if (response.ok) {
      return response.json();
    }

    const errorParams = {
      status: response.status,
      statusText: response.statusText,
    };

    if (response.status === Status.SERVICE_UNAVAILABLE) {
      errorParams.message =
        `The server timed out and we were unable to complete your request. We're\
 looking into the issue but feel free to try again.`;
    } else if (response.status === Status.UNAUTHORIZED) {
      errorParams.message = 'You are not authorized to take this action';
    } else if (response.headers.get('Content-Type').indexOf(APPLICATION_JSON) > -1) {
      errorParams.content = await response.json();
    }

    error = new HttpError(errorParams);
  } catch (err) {
    // If we are catching here, there's something else going wrong we are likely unsure of but
    // clients of fetch should still get an HttpError back for error handling reasons
    
    //TO-DO: uncomment
    //bugsnagClient.notify(err);

    error = new HttpError({ content: err, status: Status.UNKNOWN, statusText: err.message });
  }

  if (error) {
    throw error;
  }

  return null;
}

function get(path, params = undefined) {
  // Only process params if we are passed something. Otherwise assume the path is complete.
  // This is helpful because QueryString is not always great at processing params while
  // JSRoutes is pretty good at building URLs for ingestion by Rails.
  if (params) {
    const { url, query } = QueryString.parseUrl(path);

    let queryParams;
    if (params instanceof FormData) {
      queryParams = Array.from(params.keys()).reduce(
        (prev, key) => ({ ...prev, [key]: params.get(key) }),
        { ...query },
      );
    } else {
      queryParams = { ...query, ...params };
    }

    // eslint-disable-next-line no-param-reassign
    path = `${url}?${QueryString.stringify(queryParams)}`;
  }

  return callFetch(
    path,
    buildRequest('GET'),
  );
}

const iOSDevices = ['iPhone', 'iPad', 'iPod'];

function isIOS() {
  if (!window.navigator || !window.navigator.platform) {
    return false;
  }

  return iOSDevices.some(device => window.navigator.platform.indexOf(device) !== -1);
}

function post(path, data) {
  return callFetch(
    path,
    buildRequest('POST', data),
  );
}

function put(path, data) {
  return callFetch(
    path,
    buildRequest('PUT', data),
  );
}

function patch(path, data) {
  return callFetch(
    path,
    buildRequest('PATCH', data),
  );
}

function httpDelete(path, data) {
  return callFetch(
    path,
    buildRequest('DELETE', data),
  );
}

const Http = {
  delete: httpDelete,
  get,
  patch,
  post,
  put,
};

export {
  FormatResponse,
  getCSRFParam,
  getCSRFToken,
  HttpError,
  isIOS,
  QueryString,
  Status,
};

export default Http;
