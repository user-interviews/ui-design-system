import { webcrypto } from 'node:crypto';

// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}
