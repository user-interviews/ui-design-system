// Keep this oxlint-disable here. FontAwesome imports should only be happening
// in this file and nowhere else in the codebase.
//
// Any direct import from '@fortawesome/free-brands-svg-icons' will create bloat in
// our overall bundle size.

/* oxlint-disable no-restricted-imports */

import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faFigma } from '@fortawesome/free-brands-svg-icons/faFigma';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

export { faGoogle, faFacebook, faFigma, faGithub, faLinkedin, faTwitter };
