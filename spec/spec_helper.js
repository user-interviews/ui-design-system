// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
import { webcrypto } from 'node:crypto';

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}
