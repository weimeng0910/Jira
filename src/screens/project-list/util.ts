/**
 * @author meng
 * @version 1.0
 * @date 2023/1/4
 * @file 获取项目列表搜索的参数，从url参数param获取
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
/**
 * @hook 从url参数param获取状态，这个hook在这里扮演全局状态管理器的作用，可以取代redux和context的作用
 * 向需要使用这个状态的地方提供全局状态
 */
export const useProjectModal = () => {
  //获取url参数
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ]);
  //open方法
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: false });
  return {
    projectModalOpen: projectCreate === 'true',
    open,
    close
  };
  //return [
  //  projectCreate === 'true',//因为从url中读取的数据都是字符串
  //  open,
  //  close
  //] as const;//这里返回的是一个tuples,返回一个元组，用as const时，可以在使用中像useState一样自定义变量名
  //返回的数据有三个以内放在tuples中，超过三个以上要用对象，使用对象返回数据后，要按名称和顺序来使用
};
//例如
//cosnt useTexst=()=>{
//  const [created,openxx,closexx]=useProjectModal()
//const [a,setA]=useState();
//}
