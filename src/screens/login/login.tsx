import { Button } from 'antd';
import { FormEvent } from 'react';

export default function LoginScreen() {
    const handlSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.currentTarget);
    };
    return (
        <form onSubmit={handlSubmit}>
            <div style={{ marginLeft: '200px', padding: '20px' }}>
                <label htmlFor="username">用户名</label>
                <input
                    type="name"
                    id={'username'}
                />
            </div>
            <div style={{ marginLeft: '200px', padding: '20px' }}>
                <label htmlFor="password">密码</label>
                <input
                    type="password"
                    id={'password'}
                />
            </div>
            <div>
                <Button
                    type="primary"
                    htmlType={'submit'}
                    style={{ marginLeft: '300px' }}
                >
                    登陆
                </Button>
            </div>
        </form>
    );
}
