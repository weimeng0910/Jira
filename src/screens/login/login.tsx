import { Button } from 'antd';
import { FormEvent } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const login = (params: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html;charset:utf-8'
        },
        body: new URLSearchParams(params)
    })
        .then(async (response: Response) => response.json)
        .catch(error => {
            console.log(error);
            error.sendStatus(500);
        });
};
const handlSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    console.log(username, password);
    login({ username, password });
};
export default function LoginScreen() {
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
                    注册
                </Button>
            </div>
        </form>
    );
}
