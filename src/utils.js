export function isObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    value !== undefined &&
    value.constructor.name === 'Object'
  );
}
