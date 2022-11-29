///**
// * @author meng
// * @version 1.0
// * @date 2022/11/28
// * 项目列表
// */
//// 外部依赖
//import styled from '@emotion/styled';
////导入内部组件
//import { Typography } from 'antd';
//import { useEffect, useState } from 'react';

//import List from './list';
//import SearchPanel from './search-panel';
////导入API请求
//import { getUsersList, getProjectsList } from '@/api/index';
////导入type
////import { User } from '@/types/user';
//// 本地依赖
//import { cleanObject } from '@/utils/cleanObject';
//import { useDebounce } from '@/utils/hooks/useDebounce';
//import useEffectOnce from '@/utils/hooks/useMount';

//interface Param {
//    name: string;
//    personId: string;
//}
//export interface User {
//    id: number | string;
//    name: string;
//}
////定义样式
//const Container = styled.div`
//    padding: 3.2rem;
//`;
//export const ProjectListScreen = () => {
//    //设置loading状态
//    const [isLoading, setIsLoading] = useState(false);
//    //设置错误的状态
//    const [error, setError] = useState<null | Error>(null);
//    // 组件状态
//    const [param, setParam] = useState<Param>({
//        name: '',
//        personId: ''
//    });

//    //自定义hook
//    const debounceParam = useDebounce<Param>(param, 2000);
//    //const paramResult = cleanObject(debounceParam);
//    //定义请求的工程列表的状态
//    const [list, setList] = useState<any>([]);

//    //user用户状态
//    const [users, setUsers] = useState<any>([]);

//    //请求用户数据
//    useEffect(() => {
//        setIsLoading(true);
//        const asynProjectsResult = async () => {
//            const result = await getProjectsList(cleanObject(debounceParam))
//                .catch(setError)
//                .finally(() => setIsLoading(false));
//            return setList(result);
//        };
//        asynProjectsResult();
//    }, [debounceParam]);

//    //useEffect(() => {
//    //    // eslint-disable-next-line promise/catch-or-return
//    //    axios
//    //        .get(`${API_URL}/projects?${qs.stringify(cleanObject(debounceParam))}`)
//    //        //.get(`${API_URL}/projects?${qs.stringify(param)}`)
//    //        .then(async response => {
//    //            // eslint-disable-next-line promise/always-return
//    //            if (response) {
//    //                setList(await response.data);
//    //            }
//    //        });
//    //}, [debounceParam]); //当用户点击下拉，param就会变化触发请求下拉数据

//    //自定义hook,执行一次useEffect
//    useEffectOnce(() => {
//        //异步的一个函数，目的是项端写async
//        const asynchronousResult = async () => {
//            const result = await getUsersList();
//            return setUsers(result);
//        };
//        asynchronousResult();
//    });
//    //useEffectOnce(() => {
//    //    // eslint-disable-next-line promise/catch-or-return
//    //    axios.post(`${API_URL}/users`).then(async response => {
//    //        // eslint-disable-next-line promise/always-return
//    //        if (response) {
//    //            setUsers(await response.data);
//    //        }
//    //    });
//    //});

//    return (
//        <Container>
//            <h1>项目列表</h1>
//            <SearchPanel
//                users={users || []}
//                param={param}
//                setParam={setParam}
//            />
//            {error ? <Typography.Text type='danger'>{error?.message}</Typography.Text> : null}
//            <List
//                loading={isLoading}
//                users={users || []}
//                dataSource={list || []}
//            />
//        </Container>
//    );
//};
