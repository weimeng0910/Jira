import { Button, Card } from 'antd';
import { useState, ReactElement } from 'react';

import LoginScreen from './login';
import RegisterScreen from './register';

export const UnauthenticatedAPP = (): ReactElement => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card>
                {isRegister ? <RegisterScreen /> : <LoginScreen />}
                <Button
                    onClick={() => setIsRegister(!isRegister)}
                    style={{ justifyContent: 'center' }}
                >
                    {isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'}
                </Button>
            </Card>
        </div>
    );
};
