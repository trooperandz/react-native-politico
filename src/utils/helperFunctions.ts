export const debounce = (callback: (...args: any[]) => void, delay = 250) => {
  let timeoutId: NodeJS.Timer | null;
  return (...args: any[]) => {
    clearTimeout(timeoutId as NodeJS.Timer);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  };
};
