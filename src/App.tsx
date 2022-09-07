import { FC } from 'react';

import '@/App.less';
import '@/css/style.css';
import LoginScreen from '@/screens/login/login';

export const App: FC = () => (
    <div>
        {/* <ProjectListScreen/> */}
        {/* <TsReactTest/> */}
        <LoginScreen />
    </div>
);
