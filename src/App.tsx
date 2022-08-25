import { FC } from 'react';

import '@/App.less';
//import { TsReactTest } from '@/components/test/TsReactTest';
import '@/css/style.css';
//import { ProjectListScreen } from '@/screens/project-list';
import LoginScreen from '@/screens/login/login';

export const App: FC = () => (
    <div>
        {/*<ProjectListScreen />*/}
        {/*<TsReactTest />*/}
        <LoginScreen />
    </div>
);
