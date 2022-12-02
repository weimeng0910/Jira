/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 注册
 */
import styled from '@emotion/styled';
import { Form, Input, Button } from 'antd';

import { useAuth } from '@/context/AuthContext';

const LongButton = styled(Button)`
    width: 100%;
`;
const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { register } = useAuth();

    const handlSubmit = async (values: { username: string; password: string }) => {
        try {
            await register(values);
        } catch (error) {
            onError(error as Error);
        }
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
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    );
};
export default RegisterScreen;
