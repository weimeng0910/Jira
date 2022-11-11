//UI
import { Button } from 'antd';
// 外部依赖
import { useEffect, useState } from 'react';

//导入内部组件
import List from './list';
import SearchPanel from './search-panel';
//导入API请求
import { getUsersList, getProjectsList } from '@/api/index';
//导入type
//import { User } from '@/types/user';
// 本地依赖
//import { cleanObject } from '@/utils/cleanObject';
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
export const ProjectListScreen = () => {
    // 组件状态
    const [param, setParam] = useState<Param>({
        name: '',
        personId: ''
    });

    //自定义hook
    const debounceParam = useDebounce<Param>(param, 2000);
    //const paramResult = cleanObject(debounceParam);
    //定义请求的工程列表的状态
    const [list, setList] = useState<any>([]);

    //user用户状态
    const [users, setUsers] = useState<any>([]);

    //请求用户数据
    useEffect(() => {
        const asynProjectsResult = async () => {
            const result = await getProjectsList(debounceParam);
            console.log(result, 'project');

            return setList(result);
        };
        asynProjectsResult();
    }, [debounceParam]);

    //useEffect(() => {
    //    // eslint-disable-next-line promise/catch-or-return
    //    axios
    //        .get(`${API_URL}/projects?${qs.stringify(cleanObject(debounceParam))}`)
    //        //.get(`${API_URL}/projects?${qs.stringify(param)}`)
    //        .then(async response => {
    //            // eslint-disable-next-line promise/always-return
    //            if (response) {
    //                setList(await response.data);
    //            }
    //        });
    //}, [debounceParam]); //当用户点击下拉，param就会变化触发请求下拉数据

    //自定义hook,执行一次useEffect
    useEffectOnce(() => {
        //异步的一个函数，目的是项端写async
        const asynchronousResult = async () => {
            const result = await getUsersList();
            console.log(result, '请求111');

            return setUsers(result);
        };
        asynchronousResult();
    });
    //useEffectOnce(() => {
    //    // eslint-disable-next-line promise/catch-or-return
    //    axios.post(`${API_URL}/users`).then(async response => {
    //        // eslint-disable-next-line promise/always-return
    //        if (response) {
    //            setUsers(await response.data);
    //        }
    //    });
    //});

    return (
        <div>
            <SearchPanel
                users={users || []}
                param={param}
                setParam={setParam}
            />
            <List
                users={users || []}
                list={list || []}
            />
            <Button type='primary'>Antd 按钮</Button>
        </div>
    );
};
