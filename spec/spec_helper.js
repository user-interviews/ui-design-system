import { webcrypto } from 'node:crypto';

import '@testing-library/jest-dom';

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}
