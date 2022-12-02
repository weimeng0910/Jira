/**
 * @author meng
 * @version 1.0
 * @date 2022/11/30
 * 获取工程用户列表的自定义hook
 */
import useEffectOnce from '@/utils/hooks/useMount';
import { useAsync } from './useAsync';
//导入类型
import { User } from '@/screens/project-list/search-panel';
//导入API请求
import { getUsersList } from '@/api/index';

export const useUser = () => {
  const { run, ...result } = useAsync<User[]>();
  //请求数据
  useEffectOnce(() => {

    run(getUsersList());

  });
  return result;
};
