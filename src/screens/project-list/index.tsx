/**
 * @author meng
 * @version 1.0
 * @date 2022/11/28
 * 项目列表
 */
// 外部依赖
import styled from '@emotion/styled';
//导入内部组件
import { Typography } from 'antd';
import { useState } from 'react';

import List from './list';
import SearchPanel from './search-panel';
//导入自定义hook
import { useProjects } from '@/utils/hooks/project';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { useUser } from '@/utils/hooks/users';

interface Param {
    name: string;
    personId: string;
}

//定义样式
const Container = styled.div`
    padding: 3.2rem;
`;
export const ProjectListScreen = () => {
    // 组件状态
    const [param, setParam] = useState<Param>({
        name: '',
        personId: ''
    });
    const debounceParam = useDebounce<Param>(param, 2000);
    //自定义hook抽像两层，把数据获取隐藏在hook useProjects useUser 中
    //定义请求的工程列表的状态
    const { isLoading, error, data: list } = useProjects(debounceParam);
    //定义请求的工程列表的状态
    const { data: users } = useUser();

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel
                users={users || []}
                param={param}
                setParam={setParam}
            />
            {error ? <Typography.Text type='danger'>{error?.message}</Typography.Text> : null}
            <List
                loading={isLoading}
                users={users || []}
                dataSource={list || []}
            />
        </Container>
    );
};
