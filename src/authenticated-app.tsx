import styled from '@emotion/styled';
import { Button } from 'antd';
import { FC } from 'react';

import { useAuth } from './context/AuthContext';
import { ProjectListScreen } from './screens/project-list';
//导入样式文件
import { Row } from '@/components/lib/lib';

//grid主容器
const Container = styled.div`
    display: grid;
    /*grid-template-rows: 6rem calc(100vh-6rem) auto;*/
    /* hand高6rem,footer高6rem,中间设置1fr,让尺寸自适应减去的 */
    grid-template-rows: 6rem 1fr;
    /* 栅格的列 */
    /*grid-template-columns: 20rem 1fr 20rem;*/
    grid-template-areas:
        'header '
        ' main ';
    height: 100vh;
    /* 各单位之间的距离 */
    /*grid-gap: 10rem;*/
`;
// grid-area 用来给栅格grid子元素起名字
const Header = styled(Row)``;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
const Main = styled.main`
    grid-area: main;
`;

export const AuthenticatedAPP: FC = () => {
    const { logout } = useAuth();
    return (
        <Container>
            <Header between>
                <HeaderLeft gap={5}>
                    <h3>logo</h3>
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>
                <HeaderRight>
                    <Button onClick={logout}>登出</Button>
                </HeaderRight>
            </Header>

            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
    );
};
