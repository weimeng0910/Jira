import { useLocation } from 'react-router';

import { useProject } from '@/utils/hooks/project';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/03/20
 * @file DisplayBoar看板util
 */

//获取url中的id
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();//这个钩子返回当前location历史对象
  const id = pathname.match(/projects\/(\d+)/)?.[1];//用正则表达式取出id
  return Number(id);
};

//通过id来获得整个project
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

/* 对pathname进行正则取值
var pathname='www.google.com/projects/123';pathname.match(/projects\/(\d+)/)
* 输出
(2)['projects/123', '123', index: 15, input: 'www.google.com/projects/123', groups: undefined]
*/
