import { Table } from 'antd';
//import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

import { User } from '@/screens/project-list/search-panel';

interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}
interface ListProps {
    list: Project[];
    users: User[];
}

const List = ({ users, list }: ListProps) => (
    <Table
        pagination={false}
        columns={[
            {
                title: '名称',
                dataIndex: 'name',
                //localeCompare排序中文字符
                sorter: (a, b) => a.name.localeCompare(b.name)
            },
            {
                title: '部门',
                dataIndex: 'organization'
            },
            {
                title: '负责人',

                render: (_value, project) => (
                    <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
                )
            },
            {
                title: '创建时间',
                dataIndex: 'created',
                render: (_value, project) => (
                    <span>
                        {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '未知'}
                    </span>
                )
            }
        ]}
        dataSource={list}
        //设置唯一的key
        rowKey={project => project.id}
    />
);

export default List;
