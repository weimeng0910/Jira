/**
 * @author meng
 * @version 1.0
 * @file 用户登陆后的主界面
 */
//import styled from '@emotion/styled';
import { Dropdown, Menu, Button } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import { ProjectScreen } from './screens/project';
import { ProjectListScreen } from './screens/project-list';
import { ReactComponent as Softwarelogo } from '@/assets/software-logo.svg';
//导入样式文件
import { Container, Header, HeaderLeft, HeaderRight, Main } from '@/css/authenticatedApp';
//导入logo跳转回根路由的方法
import resetRoute from '@/utils';

//Antd的menu下拉
const menuItems = [
    {
        key: 'logout',
        label: '退出登陆'
    }
];
//抽离Header
const PageHeader = () => {
    const { logout, userData } = useAuth();
    return (
        <Header between>
            <HeaderLeft gap={5}>
                <Button
                    type='link'
                    onClick={resetRoute}
                >
                    <Softwarelogo
                        width='14rem'
                        color='#3ec785'
                    />
                </Button>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown
                    overlay={
                        <Menu
                            items={menuItems}
                            onClick={logout}
                        />
                    }
                >
                    <Button type='link'>Hi, {userData?.username}</Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    );
};

//路由
export const AuthenticatedAPP = () => (
    <Container>
        <Router>
            <PageHeader />
            <Main>
                <Routes>
                    {/*默认路由 */}
                    <Route
                        index
                        element={<ProjectListScreen />}
                    />
                    <Route
                        path='/projects'
                        element={<ProjectListScreen />}
                    />
                    <Route
                        path='projects/:projectId/*'
                        element={<ProjectScreen />}
                    />

                    {/* 重定向到首页*/}
                    <Route
                        path='/'
                        element={<Navigate to='/projects' />}
                    />
                    {/* 错误路径 ,*是全部的意思，以上路由都没匹配到执行*/}
                    {/*<Route
                        path='*'
                        element={<ErrrorPage />}
                    />*/}
                </Routes>
            </Main>
        </Router>
    </Container>
);
