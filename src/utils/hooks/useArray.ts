import { useState } from 'react';


export const useArray = <T>(curentObj: T[]) => {

  const [value, setValue] = useState(curentObj);

  const add = (addObj: T) => {

    setValue([...value, addObj]);

  };

  const clear = () => {

    setValue([]);

  };

  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy);

  };

  return {
    value,
    setValue,
    add,
    clear,
    removeIndex
  };
};
