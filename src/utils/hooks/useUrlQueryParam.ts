/**
 * @author meng
 * @version 1.0
 * @date 2022/12/23
 * 返回页面url中，指定銉的参数值
 * 获取Url中的参数并返回一个对象，例如：{name:meng,age:18}的hook
 */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  /**
   * @description 返回一个数组中加工后的对象，prev:{}改成Record<string, unknown> 代表任意对象
   * @note Record的内部定义，接收两个泛型参数；Record后面的泛型就是对象键和值的类型
   * @note reduce方法在这里，先给第一个值为空对象，然后遍历数组，把获取的key和值（searchParams.get (key)）放入这个对象中返回
   * @param { * } -- keys:string 传入数组类型为字符串
   */
  const [searchParams, setSearchParam] = useSearchParams();
  //console.log(searchParams.get('name'));

  return [
    useMemo(
      () => keys.reduce(
        (prev, key) =>

          ({ ...prev, [key]: searchParams.get(key) || '' }),
        {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]),
    setSearchParam
  ] as const;
};
