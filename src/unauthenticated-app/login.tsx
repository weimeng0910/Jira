/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 登陆
 */
import styled from '@emotion/styled';
import { Form, Input, Button } from 'antd';
import { FC, ReactElement } from 'react';

import { useAuth } from '@/context/AuthContext';

const LongButton = styled(Button)`
    width: 100%;
`;
const LoginScreen: FC = (): ReactElement => {
    const { login } = useAuth();

    const handlSubmit = (values: { username: string; password: string }) => {
        login(values);
    };
    return (
        <Form onFinish={handlSubmit}>
            <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    placeholder='用户名'
                    type='text'
                    id='username'
                />
            </Form.Item>
            <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input
                    placeholder='密码'
                    type='text'
                    id='password'
                />
            </Form.Item>

            <Form.Item>
                <LongButton
                    type='primary'
                    htmlType='submit'
                >
                    登陆
                </LongButton>
            </Form.Item>
        </Form>
    );
};
export default LoginScreen;
