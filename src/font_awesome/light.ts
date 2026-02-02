// Keep this eslint-disable here. FontAwesome imports should only be happening
// in this file and nowhere else in the codebase.
//
// Any direct import from '@fortawesome/pro-light-svg-icons' will create bloat in
// our overall bundle size.

/* eslint-disable no-restricted-imports */

import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';

export {
  faTimes,
};