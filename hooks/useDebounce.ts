import { useRef } from 'react';

const useDebounce = (func: Function, delay: number): any => {
  const ref = useRef<any>(null)

  return (args) => {
    clearTimeout(ref.current)
    ref.current = setTimeout(() => func(args), delay)
  };
}

export default useDebounce