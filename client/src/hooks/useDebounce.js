import { useState, useEffect } from 'react';

/**
 * Delays updating the returned value until the input hasn't changed
 * for `delay` milliseconds. Used to avoid firing a search API call
 * on every keystroke.
 *
 * @param {*}      value - The value to debounce (usually a search string)
 * @param {number} delay - Debounce delay in ms (default: 350)
 * @returns {*} The debounced value
 */
const useDebounce = (value, delay = 350) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the previous timer every time value or delay changes.
    // This is the key: if the user types quickly, only the final
    // keystroke's timer ever completes.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
