import { useEffect } from 'react';

export const useMount = (callback: Function) => {
  useEffect(() => {
    callback();
  }, []);
};
