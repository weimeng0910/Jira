/**
 * @author meng
 * @version 1.0
 * @date 2023/03/20
 * @file 获取task数据的自定义hook
 */
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';

//导入API请求

import { http } from '@/api/http';
//导入类型
import { Task } from '@/types/task';

/**
* @function
* 通过useQuery获取isplayBoard数据
*/

export const useTasks = (param?: Partial<Task>) =>

  useQuery<Task[]>(['tasks', param], () =>

    http({
      url: 'tasks',
      data: param,
      method: 'get'
    })
  );

/**
* @function
* 通过useQuery增加tasks数据
*/

export const useAddTask = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();

  return useMutation((params: Partial<Task>) =>

    http({
      url: 'tasks',
      data: params,
      method: 'post'
    }),
    {
      // queryClient.invalidateQueries： 在提交成功/失败之后都进行重新查询更新状态
      onSuccess: () => queryClient.invalidateQueries(queryKey),

      async onMutate(target) {
        //组装对象写入缓存数据
        const newTarget = { ...target, ownerId: Date.now() };
        //取消任何传出的重新获取（这样它们就不会覆盖我们的乐观更新）
        await queryClient.cancelQueries(queryKey);
        //query缓存中的数据
        const previousItems = queryClient.getQueryData(queryKey);
        //向缓存中设置数据,这里会出现形参和实参不符的问题，解决是在old后面加？
        queryClient.setQueryData(queryKey, (old?: any[]) => (old ? [...old, newTarget] : []));
        // 返回具有快照值的上下文对象


        return { previousItems };
      },
      //出现错误后回滚
      onError(_error: Error, _newItem, context) {
        queryClient.setQueryData(queryKey, (context as { previousItems: Task[] }).previousItems);
      },
      // 总是在错误或成功后重新获取
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

};
