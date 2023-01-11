/**
 * @author meng
 * @version 1.0
 * @file APP
 */
import { FC } from 'react';

import { AuthenticatedAPP } from './authenticated-app';
import { FullPageErrorFallback } from './components/lib/lib';
import { useAuth } from './context/AuthContext';
import { UnauthenticatedAPP } from './unauthenticated-app';
import '@/App.less';
<<<<<<< HEAD
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
=======
//错误边界
import { ErrorBoundary } from '@/components/error-boundary/error-boundary';
>>>>>>> meng

// FC  是 FunctionComponent
export const App: FC = () => {
    const { userData } = useAuth();
    return (
        <div>
            <ErrorBoundary fallbackRender={FullPageErrorFallback}>
                {userData ? <AuthenticatedAPP /> : <UnauthenticatedAPP />}
            </ErrorBoundary>
        </div>
    );
};
>>>>>>> meng
