// Keep this eslint-disable here. FontAwesome imports should only be happening
// in this file and nowhere else in the codebase.
//
// Any direct import from '@fortawesome/free-brands-svg-icons' will create bloat in
// our overall bundle size.

/* eslint-disable no-restricted-imports */

import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

export {
  faGoogle,
  faFacebook,
  faLinkedin,
  faTwitter,
};
