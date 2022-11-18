import styled from '@emotion/styled';
import { Button } from 'antd';
import { FC } from 'react';

import { useAuth } from './context/AuthContext';
import { ProjectListScreen } from './screens/project-list';

//grid主容器
const Container = styled.div`
    display: grid;
    /*grid-template-rows: 6rem calc(100vh-6rem) auto;*/
    /* hand高6rem,footer高6rem,中间设置1fr,让尺寸自适应减去的 */
    grid-template-rows: 6rem 1fr 6rem;
    /* 栅格的列 */
    grid-template-columns: 20rem 1fr 20rem;
    grid-template-areas:
        'header header header'
        'nav main aside'
        'footer footer  footer ';
    height: 100vh;
    /* 各单位之间的距离 */
    grid-gap: 10rem;
`;
// grid-area 用来给栅格grid子元素起名字
const Header = styled.header`
    grid-area: header;
    /* grid中的子元素设置弹性盒子flex */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderRight = styled.div``;
const Main = styled.main`
    grid-area: main;
`;
const Nav = styled.nav`
    grid-area: nav;
`;
const Aside = styled.aside`
    grid-area: aside;
`;
const Footer = styled.footer`
    grid-area: foorer;
`;
const H3 = styled.h3`
    row-gap: 10rem;
`;
export const AuthenticatedAPP: FC = () => {
    const { logout } = useAuth();
    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <H3>logo</H3>
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>
                <HeaderRight>
                    <Button onClick={logout}>登出</Button>
                </HeaderRight>
            </Header>
            <Nav>nav</Nav>
            <Main>
                <ProjectListScreen />
            </Main>
            <Aside>aside</Aside>
            <Footer>footer</Footer>
        </Container>
    );
};
