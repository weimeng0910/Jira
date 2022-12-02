/**
 * @author meng
 * @version 1.0
 * @date 2022/11/30
 * 获取工程列表的自定义hook
 */
import { useEffect } from 'react';

import { cleanObject } from '@/utils/cleanObject';
//导入处定义hook,处理异步加载
import { useAsync } from '@/utils/hooks/useAsync';
//导入类型
import { Project } from '@/screens/project-list/list';
//导入API请求
import { getProjectsList } from '@/api/index';

export const useProjects = (param?: Partial<Project>) => {
  //定义请求的工程列表的状态
  const { run, ...result } = useAsync<Project[]>();

  //请求数据
  useEffect(() => {
    run(getProjectsList(cleanObject(param || {})));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
