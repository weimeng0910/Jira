import { Button } from 'antd';
import { FC } from 'react';

import '@/app.less';
import style from '@/css/lessStyle.less';
import { ProjectListScreen } from '@/screens/project-list';

//import text from '@/css/text.css';
//import flower from '@/img/search.png';
export const App: FC = () => (
    <div className={style.container}>
        <ProjectListScreen />
        <Button type="primary">Antd 按钮</Button>
    </div>
);
