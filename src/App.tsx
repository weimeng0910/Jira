import { FC } from 'react';

import { AuthenticatedAPP } from './authenticated-app';
import { FullPageErrorFallback } from './components/lib/lib';
import { useAuth } from './context/AuthContext';
import { UnauthenticatedAPP } from './unauthenticated-app';
import '@/App.less';
import { ErrorBoundary } from '@/components/error-boundary/error-boundary';

//import '@/css/style.css';

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
