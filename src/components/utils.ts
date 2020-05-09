import { useEffect, useRef } from 'react';

export const generateArrayOfLetter = (length: number): string[] => {
  const arr = [];
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  while (arr.length < length) {
    const char = letters.charAt(Math.floor(Math.random() * letters.length));
    arr.push(char);
  }

  return arr;
};

type savedCallbackType = {
  current: (() => void) | undefined;
};

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback: savedCallbackType = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current !== undefined && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
