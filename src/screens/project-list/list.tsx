/**
 * @author meng
 * @version 1.0
 * @date 2022/11/24
 * @file LIST组件
 */
// 外部依赖
import { Table, TableProps } from 'antd';
//import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-cycle
import { User } from '@/screens/project-list/search-panel';

export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization?: string;
    created: number;
}
//这个类型包含了TableProps中的所有属性，和users这个属性
interface ListProps extends TableProps<Project> {
    users: User[];
}
//type PropsType = Omit<ListProps,'users'>//...props的类型
//父组件传过来的{ users, ...props }这个props,里面包含了所有的TableProps
//还有users这个数据，先把users取出来，把loading等其它属性放在...props中
const List = ({ users, ...props }: ListProps) => (
    <Table
        pagination={false}
        columns={[
            {
                title: '名称',
                //dataIndex: 'name',
                //localeCompare排序中文字符
                sorter: (a, b) => a.name.localeCompare(b.name),
                render: (_value, project) => (
                    <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
                )
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
        //type PropsType = Omit<ListProps,'users'>//...props的类型
        {...props}
        //设置唯一的key
        rowKey={project => project.id!}
    />
);

export default List;
