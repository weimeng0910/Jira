/**
 * @author meng
 * @version 1.0
 * @date 2023/03/20
 * @file 获取task数据的自定义hook
 */
import { useQuery } from 'react-query';

//导入API请求

import { http } from '@/api/http';
//导入类型
import { Task } from '@/types/task';

/**
* @function
* 通过useQuery获取isplayBoard数据
*/

export const useTask = (param?: Partial<Task>) =>

  useQuery<Task[]>(['task', param], () =>

    http({
      url: `task/${param}`,
      data: param,
      method: 'get'
    })
  );
