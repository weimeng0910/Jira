import styled from '@emotion/styled';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import { DisplayBoardScreen } from '../displayBoard';
import { EpicScreen } from '../epic';

/**
 * @author meng
 * @version 1.0
 * @file project二级路由页面
 */
//样式
const Aside = styled.aside`
    background-color: rgb(244, 245, 247);
    display: flex;
`;

const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
    display: flex;
    overflow: hidden;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
`;
// 用来作为 404 页面的组件
const NotFound = () => <div>路径错误</div>;

export const ProjectScreen = () => (
    <Container>
        <Aside>
            <h1>ProjectScreen</h1>
            <Link to='displayBoard'>看板</Link>
            <Link to='epic'>任务组</Link>
        </Aside>
        <Main>
            <Routes>
                {/*默认路由 */}
                <Route
                    path='/'
                    element={
                        <Navigate
                            to={`${window.location.pathname}/displayBoard`}
                            //不会出现无限循环，会回退到需要的页['projects','projects/6',window.location.pathname}+'displayBoardš]
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
        </Main>
    </Container>
);
