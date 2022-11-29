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
import { useEffect, useState } from 'react';

import List from './list';
//导入类型
import { Project } from './list';
import SearchPanel from './search-panel';
//导入API请求
import { getUsersList, getProjectsList } from '@/api/index';
//导入type
//import { User } from '@/types/user';
// 本地依赖
import { cleanObject } from '@/utils/cleanObject';
//导入处定义hook,处理异步加载
import { useAsync } from '@/utils/hooks/useAsync';
import { useDebounce } from '@/utils/hooks/useDebounce';
import useEffectOnce from '@/utils/hooks/useMount';

interface Param {
    name: string;
    personId: string;
}
export interface User {
    id: number | string;
    name: string;
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

    //自定义hook
    const debounceParam = useDebounce<Param>(param, 2000);

    //定义请求的工程列表的状态
    const { run, isLoading, error, data: list } = useAsync<Project[]>();
    //user用户状态
    const [users, setUsers] = useState<User[]>([]);

    //请求用户数据
    useEffect(() => {
        run(getProjectsList(cleanObject(debounceParam)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceParam]);

    //自定义hook,执行一次useEffect
    useEffectOnce(() => {
        //异步的一个函数，目的是项端写async
        const asynchronousResult = async () => {
            const result = await getUsersList();
            return setUsers(result);
        };
        asynchronousResult();
    });
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
