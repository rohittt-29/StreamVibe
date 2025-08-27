import { useEffect, useRef } from 'react';

const useStaggeredLoading = (callbacks, delays = [0, 500, 1000, 1500]) => {
  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current) return;
    executedRef.current = true;

    // Execute callbacks with staggered delays
    callbacks.forEach((callback, index) => {
      const delay = delays[index] || 0;
      setTimeout(() => {
        if (typeof callback === 'function') {
          callback();
        }
      }, delay);
    });
  }, [callbacks, delays]);
};

export default useStaggeredLoading;
