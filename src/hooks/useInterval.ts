import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay = 5000) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function callbackReference() {
      savedCallback.current();
    }

    const id = setInterval(callbackReference, delay);

    return () => clearInterval(id);
  }, [delay]);
};
