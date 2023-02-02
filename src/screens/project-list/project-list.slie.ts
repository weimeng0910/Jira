/**
 * @author meng
 * @version 1.0
 * @date 2023/02/01
 * @file  创建project-list的reducer切片
 */

import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';


/**
 * @type  Define a type for the slice state
 */
interface State {
  projectModalOpen: boolean;
}
/**
 * 使用该类型定义初始状态数据
 */
const initialState: State = {
  projectModalOpen: false
};

/**
 * 创建一个 Redux 状态,切片
 * 导出 projectListSlice.reducer
 */
export const projectListSlice = createSlice({
  //命名空间，name值会做为action type的前缀
  name: 'projectListSlice',
  //初始化状态数据
  initialState,
  //1.定义更新状态的函数，2.组件中dispach时做为action的方法名：openProjectModal or closeProjectModa
  reducers: {
    openProjectModal(state: State) {
      // Redux Toolkit 允许我们在 reducer 中编写“变异”逻辑。 它
      // 实际上并没有改变状态，因为它使用了 Immer 库，所以可以直接更改状态
      // 它用影子创建一个全新的对象

      state.projectModalOpen = true;
    },
    closeProjectModal(state: State) {
      state.projectModalOpen = false;
    }
  }
});
//导出actions函数
export const projectListActions = projectListSlice.actions;
//导出state
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
