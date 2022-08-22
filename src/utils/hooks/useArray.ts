import { useState } from 'react';

type CurrentObj = {
  name: string;
  age: number;
};

export const useArray = (curentObj: CurrentObj[]) => {

  const [value, setValue] = useState(curentObj);

  const add = (addObj: CurrentObj) => {

    setValue([...value, addObj]);

  };

  const clear = () => {

    setValue([]);

  };

  const removeIndex = (index: number) => {
    console.log(index);

    setValue(value.splice(index, 1));

  };

  return { value, add, clear, removeIndex };
};
