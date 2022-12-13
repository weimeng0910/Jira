/**
 * @author meng
 * @version 1.0
 *project二级路由页面
 */
import { Routes, Route, Navigate } from 'react-router';
import { Link } from 'react-router-dom';

import { DisplayBoardScreen } from '../diplayBoard';
import { EpicScreen } from '../epic';

export const ProjectScreen = () => (
    <div>
        <h1>ProjectScreen</h1>
        <Link to='displayBoard'>看板</Link>
        <Link to='epic'>任务组</Link>
        <Routes>
            <Route
                path='/displayBoard'
                element={<DisplayBoardScreen />}
            />
            <Route
                path='/epic'
                element={<EpicScreen />}
            />
            <Route
                path='/'
                element={<Navigate to={`${window.location.pathname}/displayBoard`} />}
            />
        </Routes>
    </div>
);
