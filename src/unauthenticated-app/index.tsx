import styled from '@emotion/styled';
import { Button, Card, Divider } from 'antd';
import { useState, ReactElement } from 'react';

import LoginScreen from './login';
import RegisterScreen from './register';
import left from '@/assets/left.svg';
import logo from '@/assets/logo.svg';
import right from '@/assets/right.svg';

const Container = styled.div`
    /* 弹性布局 */
    display: 'flex';
    /* 选择column或者column-reverse者时，你的主轴会沿着下面方向延展 — 也就是块排列的方向。 */
    flex-direction: column;
    /* 为了使我们的盒子居中，通过align-items属性，可以将交叉轴上的 item 对齐 */
    align-items: center;
    /* min-height 属性设置元素的最小高度。 */
    min-height: 100vh;
`;
const NewCard = styled(Card)`
    width: 40rem;
    padding: 3.6em 4rem;
    /* 边框出现圆角 */
    border-radius: 0.3rem;
    /* 在css3中border-box是box-sizing属性的一个值。
     box-sizing 属性允许您以特定的方式定义匹配某个区域的特定元素。
      例如，假如您需要并排放置两个带边框的框，可通过将box-sizing 设置为"border-box"。
       这可令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中 */
    box-sizing: border-box;
    /* box-shadow 属性向框添加一个或多个阴影。 */
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    /* min-height 属性设置元素的最小高度。 */
    min-height: 56rem;
    text-align: center;
`;
const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`;
const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed; // 决定背景图片是否会随页面滑动而滑动
    background-position: left bottom, right bottom;
    background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem),
        cover;
    background-image: url(${left}), url(${right});
`;
export const LongButton = styled(Button)`
    width: 100%;
`;
export const UnauthenticatedAPP = (): ReactElement => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <Container>
            <div>
                <img
                    alt=''
                    src={logo}
                />
            </div>
            <Header />
            <Background />

            <NewCard>
                {isRegister ? <RegisterScreen /> : <LoginScreen />}
                <Divider />
                <Button
                    onClick={() => setIsRegister(!isRegister)}
                    style={{ justifyContent: 'center' }}
                >
                    {isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'}
                </Button>
            </NewCard>
        </Container>
    );
};
