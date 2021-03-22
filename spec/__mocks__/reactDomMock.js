// See: https://github.com/facebook/react/issues/11565
// This appears to be a bug with React when testing modals
// with react-test-renderer
jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');

  return {
    ...original,
    createPortal: (node) => node,
  };
});
