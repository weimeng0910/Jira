/**
 * @author meng
 * @version 1.0
 * @file project二级路由页面
 */
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import { DisplayBoardScreen } from '../diplayBoard';
import { EpicScreen } from '../epic';

// 用来作为 404 页面的组件
const NotFound = () => <div>路径错误</div>;
export const ProjectScreen = () => (
    <div>
        <h1>ProjectScreen</h1>
        <Link to='displayBoard'>看板</Link>
        <Link to='epic'>任务组</Link>
        <Routes>
            {/*默认路由 */}
            <Route
                path='/'
                element={
                    <Navigate
                        to={`${window.location.pathname}/displayBoard`}
                        replace
                    />
                }
            />
            <Route
                path='displayBoard'
                element={<DisplayBoardScreen />}
            />
            <Route
                path='epic'
                element={<EpicScreen />}
            />

            <Route
                path='*'
                element={<NotFound />}
            />
        </Routes>
    </div>
);
