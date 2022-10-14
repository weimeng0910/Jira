import { Button } from 'antd';
import { FC } from 'react';

import { useAuth } from './context/AuthContext';
import { ProjectListScreen } from './screens/project-list';

export const AuthenticatedAPP: FC = () => {
    const { logout } = useAuth();
    return (
        <div>
            <Button onClick={logout}>登出</Button>
            <ProjectListScreen />
        </div>
    );
};
