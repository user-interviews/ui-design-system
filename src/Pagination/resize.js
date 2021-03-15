/*
Stolen from https://developer.mozilla.org/en-US/docs/Web/Events/resize
but this is a wrapper method to help prevent a resize watch from firing too fast
 */
function addResizeEventListener(callback) {
  let resizeTimeout;

  const resizeThrottler = () => {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        callback();

        // The actualResizeHandler will execute at a rate of 15fps
      }, 66);
    }
  };

  window.addEventListener('resize', resizeThrottler, false);

  return resizeThrottler;
}

function cleanupResizeEventListener(listener) {
  window.removeEventListener('resize', listener);
}

module.exports = {
  listen: addResizeEventListener,
  cleanup: cleanupResizeEventListener,
};
