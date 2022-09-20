import { Button } from 'antd';
import { FormEvent } from 'react';

import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
    const { login, userData } = useAuth();
    console.log(userData);

    const handlSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        login({ username, password });
    };
    return (
        <form onSubmit={handlSubmit}>
            <div>登陆成功{}</div>

            <div style={{ marginLeft: '200px', padding: '20px' }}>
                <label htmlFor='username'>用户名</label>
                <input
                    type='name'
                    id='username'
                />
            </div>
            <div style={{ marginLeft: '200px', padding: '20px' }}>
                <label htmlFor='password'>密码</label>
                <input
                    type='password'
                    id='password'
                />
            </div>
            <div>
                <Button
                    type='primary'
                    htmlType='submit'
                    style={{ marginLeft: '300px' }}
                >
                    登陆
                </Button>
            </div>
        </form>
    );
}
