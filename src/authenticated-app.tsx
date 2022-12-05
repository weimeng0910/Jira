/**
 * @author meng
 * @version 1.0
 *用户登陆后的主界面
 */
import styled from '@emotion/styled';
import { Dropdown, Menu, Button } from 'antd';

//导入jwt解密token中的id
//import jwt from 'jsonwebtoken';
import { useAuth } from './context/AuthContext';
import { ProjectListScreen } from './screens/project-list';
import { ReactComponent as Softwarelogo } from '@/assets/software-logo.svg';
//导入样式文件
import { Row } from '@/components/lib/lib';

//样式定义
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
const Header = styled(Row)`
    padding: 3.2rem;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
const Main = styled.main`
    grid-area: main;
`;
//Antd的menu下拉
const menuItems = [
    {
        key: 'logout',
        label: '退出登陆'
    }
];
export const AuthenticatedAPP = () => {
    const { logout, userData } = useAuth();
    //const value: any = undefined;
    return (
        <Container>
            {/*{value.notExist}*/}
            <Header between>
                <HeaderLeft gap={5}>
                    <Softwarelogo
                        width='14rem'
                        color='#3ec785'
                    />

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

            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
    );
};
