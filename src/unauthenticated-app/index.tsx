import { Button } from 'antd';
import { FC, useState } from 'react';

import LoginScreen from './login';
import RegisterScreen from './register';

export const UnauthenticatedAPP: FC = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div>
            {isRegister ? <RegisterScreen /> : <LoginScreen />}
            <Button
                onClick={() => setIsRegister(!isRegister)}
                type='primary'
                htmlType='submit'
                style={{ marginLeft: '300px' }}
            >
                切换到{isRegister ? '登陆' : '注册'}
            </Button>
        </div>
    );
};
