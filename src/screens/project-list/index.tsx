/**
 * @author meng
 * @version 1.0
 * @date 2022/11/28
 * @file 项目列表
 */
import styled from '@emotion/styled';
import { Typography, Button } from 'antd';
import { useDispatch } from 'react-redux';

import List from './list';
import { projectListActions } from './project-list.slie';
import SearchPanel from './search-panel';
import { useProjectSearchParam } from './util';
import { Row } from '@/components/lib/lib';
//导入自定义hook
import { useProjects } from '@/utils/hooks/project';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { useDocumentTitle } from '@/utils/hooks/useDocumentTitle';
import { useUser } from '@/utils/hooks/users';

//定义样式
const Container = styled.div`
    padding: 3.2rem;
`;
export const ProjectListScreen = () => {
    //引入redux的钩子useDispatch,获得store中的状态
    const dispatch = useDispatch();
    //设置页面标题
    useDocumentTitle('项目列表', false);
    // 基本类型，组件状态可以入在依赖里，非组件状态的对象，绝不可以入在依赖里
    //const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    //const projectParam = { ...param, personId: Number(param.personId) || undefined };
    //从获取url中参数的hook中解构param参数
    const [param, setParam] = useProjectSearchParam();
    const debounceParam = useDebounce(param, 2000);
    //自定义hook抽像两层，把数据获取隐藏在hook useProjects useUser 中
    //定义请求的工程列表的状态
    const { isLoading, error, data: list, retry } = useProjects(debounceParam);
    //定义请求的工程列表的状态
    const { data: users } = useUser();

    return (
        <Container>
            <Row between>
                <h1>项目列表</h1>
                <Button onClick={() => dispatch(projectListActions.openProjectModal())}>
                    创建项目
                </Button>
            </Row>

            <SearchPanel
                param={param}
                setParam={setParam}
            />

            {error ? <Typography.Text type='danger'>{error?.message}</Typography.Text> : null}
            <List
                refresh={retry}
                loading={isLoading}
                users={users || []}
                dataSource={list || []}
            />
        </Container>
    );
};
ProjectListScreen.whyDidYouRender = true;
