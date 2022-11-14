import { Form, Input, Button } from 'antd';
import { FC, ReactElement } from 'react';

import { useAuth } from '@/context/AuthContext';

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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    登陆
                </Button>
            </Form.Item>
        </Form>
    );
};
export default LoginScreen;
