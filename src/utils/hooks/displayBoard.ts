/**
 * @author meng
 * @version 1.0
 * @date 2023/03/14
 * @file 获取看板数据的自定义hook
 */
import { useQuery } from 'react-query';

//导入API请求

import { http } from '@/api/http';
//导入类型
import { DisplayBoard } from '@/types/displayBoard';

/**
* @function
* 通过useQuery获取isplayBoard数据
*/

export const useDisplayBoard = (param?: Partial<DisplayBoard>) =>

  useQuery<DisplayBoard>(['displayBoards', param], () =>

    http({
      url: `displayBoards/${param}`,
      data: param,
      method: 'put'
    })
  );
