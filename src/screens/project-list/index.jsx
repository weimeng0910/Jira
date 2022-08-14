//导入qs和UI
import { Button } from 'antd';
import qs from 'qs';
// 外部依赖
import React from 'react';
import { useEffect, useState } from 'react';

//导入组件
import List from './list';
import SearchPanel from './search-panel';
//导入样式文件
import '@/css/style.css';
// 本地依赖
import { cleanObject } from '@/utils/cleanObject';
import useDebounce from '@/utils/hooks/useDebounce';
import { useMount } from '@/utils/hooks/useMount';

//获取数据连接地址API_URL
const apiUrl = process.env.REACT_APP_API_URL;
console.log(process.env.NODE_ENV);

export const ProjectListScreen = () => {
    // 组件状态
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });

    //自定义hook
    const debounceParam = useDebounce(param, 2000);

    //定义请求的工程列表的状态
    const [list, setList] = useState([]);

    //user用户状态
    const [users, setUsers] = useState([]);

    //请求用户数据
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(
            async response => {
                if (response.ok) {
                    setList(await response.json());
                }
            }
        );
    }, [debounceParam]); //当用户点击下拉，param就会变化触发请求下拉数据

    //自定义hook
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json());
            }
        });
    });
    return (
        <div>
            <SearchPanel
                users={users}
                param={debounceParam}
                setParam={setParam}
            />
            <List
                users={users}
                list={list}
            />
            <Button type="primary">Antd 按钮</Button>
        </div>
    );
};
