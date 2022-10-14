import { FC } from 'react';

import { AuthenticatedAPP } from './authenticated-app';
import { useAuth } from './context/AuthContext';
import { UnauthenticatedAPP } from './unauthenticated-app';
import '@/App.less';
<<<<<<< HEAD
import { TsReactTest } from '@/components/test/TsReactTest';

//import '@/css/style.css';

//import { ProjectListScreen } from '@/screens/project-list';

export const App: FC = () => (
    <div>
        {/*<ProjectListScreen />*/}
        <TsReactTest></TsReactTest>
    </div>
);
=======
import '@/css/style.css';

// FC  是 FunctionComponent
export const App: FC = () => {
    const { userData } = useAuth();
    return <div>{userData ? <AuthenticatedAPP /> : <UnauthenticatedAPP />}</div>;
};
>>>>>>> meng
