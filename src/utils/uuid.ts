export const generateUUID = () => {
  if (globalThis?.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  throw new Error('Crypto.randomUUID is not available in this environment.');
};
