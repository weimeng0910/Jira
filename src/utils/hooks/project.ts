/**
 * @author meng
 * @version 1.0
 * @date 2022/11/30
 * @file 获取工程列表的自定义hook
 * @date 2023/02/08利用react-query来获取缓存数据
 */

import { useQuery, useMutation, useQueryClient } from 'react-query';

//导入API请求
import { getProjectsList } from '@/api/index';
import { http } from '@/api/http';
//导入类型
import { Project } from '@/types/user';

/**
* @function
* 通过useQuery获取project数据
*/

export const useProjects = (param?: Partial<Project>) =>

  useQuery<Project[]>(['projects', param], () =>

    getProjectsList(param || {}));

/**
* @function
* 编辑project
*/

export const useEditProject = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation(

    (params: Partial<Project>) =>

      http({
        url: `projects/${params.id}`,
        data: params,
        method: 'put'
      }),

    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  );

  return mutation;
};

/**
* @function
* 增加project
*/

export const useAddProject = () => {

  const queryClient = useQueryClient();

  const mutate = useMutation((params: Partial<Project>) =>

    http({
      url: `projects/${params.id}`,
      data: params,
      method: 'post'
    }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  );
  return mutate;
};

/**
* @function 通过ID获取project的详情数据
*/
export const useProject = (id?: number) => {
  //根据['project', { id }]中的id来更新project的数据，useQuery
  const result = useQuery<Project>(['project', { id }], () =>

    http({
      url: `projects/${id}`,
      data: id,
      method: 'put'
    }),
    {
      //第三个参数处理传入的id为undefined时不触发获取，当ID有值时触发获取数据
      enabled: Boolean(id)
    }
  );
  return result;
};
