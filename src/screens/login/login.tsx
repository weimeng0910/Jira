import { Button } from 'antd';
import { FormEvent } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;
// console.log(apiUrl);

export default function LoginScreen() {
    const login = (params: { username: string; password: string }) => {
        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/html;charset:utf-8'
            },
            body: new URLSearchParams(params)
        });
    };
    const handlSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        console.log(username, password);
        login({ username, password });
    };
    return (
        <form onSubmit={handlSubmit}>
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
