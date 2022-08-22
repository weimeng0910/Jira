import { FC } from 'react';

import '@/App.less';
import { TsReactTest } from '@/components/test/TsReactTest';

//import '@/css/style.css';

//import { ProjectListScreen } from '@/screens/project-list';

export const App: FC = () => (
    <div>
        {/*<ProjectListScreen />*/}
        <TsReactTest></TsReactTest>
    </div>
);
