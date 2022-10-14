import { FC } from 'react';

import { AuthenticatedAPP } from './authenticated-app';
import { useAuth } from './context/AuthContext';
import { UnauthenticatedAPP } from './unauthenticated-app';
import '@/App.less';
import '@/css/style.css';

// FC  是 FunctionComponent
export const App: FC = () => {
    const { userData } = useAuth();
    return <div>{userData ? <AuthenticatedAPP /> : <UnauthenticatedAPP />}</div>;
};
