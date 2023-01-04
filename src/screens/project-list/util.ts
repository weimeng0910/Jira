/**
 * @author meng
 * @version 1.0
 * @date 2023/1/4
 * @file 获取url参数param
 */
import { useMemo } from 'react';

import { useUrlQueryParam } from '@/utils/hooks/useUrlQueryParam';

export const useProjectSearchParam = () => {

  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [

    useMemo(() => ({
      ...param,
      personId: Number(param.personId) || undefined,
    }), [param]),
    setParam,
  ] as const;
  //在 TypeScript 中使用 as const 时，我们可以将对象的属性或数组的元素设置为只读，向语言表明表达式中的类型不会被扩大
  //const断言告诉编译器为表达式推断出它能推断出的最窄或最特定的类型。如果不使用它，
  //编译器将使用其默认类型推断行为，这可能会导致更广泛或更一般的类型。
};
