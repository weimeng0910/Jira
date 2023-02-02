/**
 * @author meng
 * @version 1.0
 * @date 2023/02/01
 * @file redux store
 */
import { configureStore } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { projectListSlice } from '@/screens/project-list/project-list.slie';

/**
 * 创建reducers,将 Slice Reducers 添加到这里
 */
export const rootReducer = {
    projectList: projectListSlice.reducer
};

/**
 * 创建一个 Redux 商店
 */
export const store = configureStore({
    reducer: rootReducer
});

/**
 * @type 暴露两个类型
 */

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
