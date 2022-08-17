import { Button } from 'antd';
import { FC } from 'react';

import '@/App.less';
import '@/css/style.css';
import { ProjectListScreen } from '@/screens/project-list';

export const App: FC = () => (
    <div>
        <ProjectListScreen />
        <Button type="primary">Button</Button>
    </div>
);
