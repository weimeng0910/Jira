import { useState } from 'react';

<<<<<<< HEAD
type CurrentObj = {
  name: string;
  age: number;
};

export const useArray = (curentObj: CurrentObj[]) => {

  const [value, setValue] = useState(curentObj);

  const add = (addObj: CurrentObj) => {
=======

export const useArray = <T>(curentObj: T[]) => {

  const [value, setValue] = useState(curentObj);

  const add = (addObj: T) => {
>>>>>>> meng

    setValue([...value, addObj]);

  };

  const clear = () => {

    setValue([]);

  };

  const removeIndex = (index: number) => {
<<<<<<< HEAD
    console.log(index);

    setValue(value.splice(index, 1));

  };

  return { value, add, clear, removeIndex };
=======
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
>>>>>>> meng
};
