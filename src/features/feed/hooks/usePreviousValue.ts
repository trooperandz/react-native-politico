import { useEffect, useRef } from 'react';

export const usePreviousValue = (value: number) => {
  const ref = useRef<number>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current as number;
};
