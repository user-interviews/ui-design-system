import { isObject } from './utils';

describe('isObject', () => {
  describe('when value is an object', () => {
    test('returns true', () => {
      expect(isObject({})).toBe(true);
    });
  });

  describe('when value is undefined', () => {
    test('returns false', () => {
      expect(isObject()).toBe(false);
    });
  });

  describe('when value is null', () => {
    test('returns false', () => {
      expect(isObject(null)).toBe(false);
    });
  });

  describe('when value is an array', () => {
    test('returns false', () => {
      expect(isObject([])).toBe(false);
    });
  });
});
