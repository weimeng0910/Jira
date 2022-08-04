import React from 'react';
import { useState, useEffect } from 'react';

import List from './list';
//导入组件
import SearchPanel from './search-panel';

//获取数据地址

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

export const ProjectListScreen = () => {
    //项目名称和项目ID的状态
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    //定义请求的工程列表的状态
    const [list, setList] = useState([]);

    //user用户状态
    const [users, setusers] = useState([]);

    //请求用户数据
    useEffect(() => {
        fetch(`${apiUrl}/projects`).then(async response => {
            if (response.ok) {
                setList(await response.json());
            }
        });
    }, [param]); //当用户点击下拉，param就会变化触发请求下拉数据
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setusers(await response.json());
            }
        });
    }, []);
    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List list={list} users={users} />
        </div>
    );
};
