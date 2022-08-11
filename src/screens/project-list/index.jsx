//导入qs
import qs from 'qs';
import React from 'react';
import { useState, useEffect } from 'react';

import List from './list';
//导入组件
import SearchPanel from './search-panel';
import { cleanObject } from '@/utils/cleanObject';
import useDebounce from '@/utils/hooks/useDebounce';
import { useMount } from '@/utils/hooks/useMount';

//获取API_URL
const apiUrl = process.env.REACT_APP_API_URL;
console.log(process.env.NODE_ENV);
export const ProjectListScreen = () => {
    //项目名称和项目ID的状态
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
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
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json());
            }
        });
    });
    return (
        <div>
            <SearchPanel users={users} param={debounceParam} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    );
};
