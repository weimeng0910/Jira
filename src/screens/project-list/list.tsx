import { Table } from 'antd';

import { User } from '@/screens/project-list/search-panel';

interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
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
                title: '负责人',

                render(value, project) {
                    return (
                        <span key={value.id}>
                            {users.find((user: User) => user.id === project.personId)?.name ||
                                '未知'}
                        </span>
                    );
                }
            }
        ]}
        dataSource={list}
    />
);

export default List;
